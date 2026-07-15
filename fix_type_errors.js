const fs = require('fs');
const file = 'src/app/admin/(dashboard)/offers/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Fix selectedOfferForPreview
// Replace occurrences of `selectedOfferForPreview.` with `selectedOfferForPreview?.`
// in the preview modal section.
// A simpler way: just wrap the usage in `{selectedOfferForPreview && ( ... )}`
const previewInnerStart = `<Dialog.Description className="sr-only">Detailed preview of the promotional campaign.</Dialog.Description>
            
            <div className="space-y-4">`;
const previewInnerEnd = `</button>
            </div>
          </Dialog.Content>`;

// Let's just do a regex replace for `selectedOfferForPreview.` -> `selectedOfferForPreview?.`
// Wait, `selectedOfferForPreview.status` is passed to `getStatusBadge(selectedOfferForPreview.status)`.
// If it's undefined, it might error.
// Safer to wrap in `{selectedOfferForPreview && (`
content = content.replace(
  '<Dialog.Description className="sr-only">Detailed preview of the promotional campaign.</Dialog.Description>',
  '<Dialog.Description className="sr-only">Detailed preview of the promotional campaign.</Dialog.Description>\n            {selectedOfferForPreview && (<>'
);
content = content.replace(
  'Close Preview\n              </button>\n            </div>\n          </Dialog.Content>',
  'Close Preview\n              </button>\n            </div>\n            </>)}\n          </Dialog.Content>'
);

// 2. Fix selectedImageForPreview
content = content.replace(
  'src={selectedImageForPreview}',
  'src={selectedImageForPreview || ""}'
);

fs.writeFileSync(file, content);
console.log('Fixed TypeScript errors');
