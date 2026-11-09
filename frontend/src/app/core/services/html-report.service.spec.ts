import { afterEach, describe, expect, it, vi } from 'vitest';
import { HtmlReportService } from './html-report.service';
import { SummaryData } from './summary.service';

afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe('downloaded learning report', () => {
    it('embeds the figure and renders caption equations as offline MathML', async () => {
        let exported: Blob | undefined;
        vi.stubGlobal('URL', {
            createObjectURL: (blob: Blob) => { exported = blob; return 'blob:report'; },
            revokeObjectURL: vi.fn()
        });
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true, blob: async () => new Blob(['test figure'], { type: 'image/svg+xml' })
        }));
        const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
        const data: SummaryData = {
            sessionId: 'student', generatedAt: new Date(0).toISOString(), learningQuestions: [], tests: [],
            pageVisits: [{ page: '/learning/p4-gyroscope?page=1', label: 'Drei Achsen', durationSeconds: 10 }]
        };
        await new HtmlReportService().download(data);
        expect(click).toHaveBeenCalledOnce();
        expect(exported).toBeDefined();
        const html = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result));
            reader.onerror = reject;
            reader.readAsText(exported!);
        });
        const document = new DOMParser().parseFromString(html, 'text/html');
        const caption = document.querySelector('figcaption')!;
        expect(caption.querySelector('math')).not.toBeNull();
        expect(caption.textContent).not.toContain('$');
        expect(document.querySelector('figure img')?.getAttribute('src')).toMatch(/^data:image\/svg\+xml;base64,/);
        expect(document.querySelector('script')).toBeNull();
    });
});
