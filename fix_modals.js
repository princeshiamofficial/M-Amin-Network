const fs = require('fs');

const file = 'src/app/admin/(dashboard)/offers/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Add import if not exists
if (!content.includes('@radix-ui/react-dialog')) {
  content = content.replace(
    /import React, { useState, useEffect } from "react";/,
    'import React, { useState, useEffect } from "react";\nimport * as Dialog from "@radix-ui/react-dialog";'
  );
}

// 1. ADD/EDIT CAMPAIGN MODAL
const promoModalOld = `{isPromoModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 font-sans">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-slate-900 font-extrabold text-base">
                {promoFormIndex !== null ? "✏ Modify Promotional Campaign" : "➕ Add New Promotional Campaign"}
              </h3>
              <button
                onClick={() => setIsPromoModalOpen(false)}
                className="text-slate-400 hover:text-slate-950 p-1 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>`;

const promoModalNew = `<Dialog.Root open={isPromoModalOpen} onOpenChange={setIsPromoModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-[9999] max-w-2xl w-full translate-x-[-50%] translate-y-[-50%] bg-white border border-slate-200/90 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto font-sans data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-200">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <Dialog.Title className="text-slate-900 font-extrabold text-base">
                {promoFormIndex !== null ? "✏ Modify Promotional Campaign" : "➕ Add New Promotional Campaign"}
              </Dialog.Title>
              <Dialog.Close asChild>
                <button
                  className="text-slate-400 hover:text-slate-950 p-1 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer outline-none"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Description className="sr-only">Form to add or edit a promotional campaign.</Dialog.Description>`;

content = content.replace(promoModalOld, promoModalNew);
content = content.replace(
  /<\/form>\n          <\/div>\n        <\/div>\n      \)}/,
  '</form>\n          </Dialog.Content>\n        </Dialog.Portal>\n      </Dialog.Root>'
);

// 2. VIEW DETAIL PREVIEW MODAL
const detailModalOld = `{selectedOfferForPreview && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-xs z-[9999] flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200/90 shadow-2xl rounded-2xl max-w-2xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200 font-sans">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 bg-slate-50 border border-slate-150 px-2 py-0.5 rounded-md">
                  CAMPAIGN PREVIEW
                </span>
                <h3 className="text-slate-900 font-extrabold text-lg mt-1">{selectedOfferForPreview.title}</h3>
              </div>
              <button
                onClick={() => setSelectedOfferForPreview(null)}
                className="text-slate-400 hover:text-slate-950 p-1 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>`;

const detailModalNew = `<Dialog.Root open={!!selectedOfferForPreview} onOpenChange={(open) => !open && setSelectedOfferForPreview(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/45 backdrop-blur-xs z-[9999] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-[9999] max-w-2xl w-full translate-x-[-50%] translate-y-[-50%] bg-white border border-slate-200/90 shadow-2xl rounded-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto font-sans data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-200">
            <div className="flex justify-between items-start border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 bg-slate-50 border border-slate-150 px-2 py-0.5 rounded-md">
                  CAMPAIGN PREVIEW
                </span>
                <Dialog.Title className="text-slate-900 font-extrabold text-lg mt-1">{selectedOfferForPreview?.title}</Dialog.Title>
              </div>
              <Dialog.Close asChild>
                <button
                  className="text-slate-400 hover:text-slate-950 p-1 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer outline-none"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Description className="sr-only">Detailed preview of the promotional campaign.</Dialog.Description>`;

content = content.replace(detailModalOld, detailModalNew);
content = content.replace(
  /Close Preview\n              <\/button>\n            <\/div>\n          <\/div>\n        <\/div>\n      \)}/,
  'Close Preview\n              </button>\n            </div>\n          </Dialog.Content>\n        </Dialog.Portal>\n      </Dialog.Root>'
);

// 3. IMAGE ZOOM MODAL
const imageModalOld = `{selectedImageForPreview && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs z-[9999] flex items-center justify-center p-4" onClick={() => setSelectedImageForPreview(null)}>
          <div className="relative max-w-4xl w-full max-h-[85vh] overflow-hidden rounded-2xl bg-black border border-slate-800 shadow-2xl scale-in duration-200">
            <button
              onClick={() => setSelectedImageForPreview(null)}
              className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/80 p-2 rounded-full transition-colors cursor-pointer z-10"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>`;

const imageModalNew = `<Dialog.Root open={!!selectedImageForPreview} onOpenChange={(open) => !open && setSelectedImageForPreview(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/70 backdrop-blur-xs z-[9999] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-[9999] max-w-4xl w-full translate-x-[-50%] translate-y-[-50%] max-h-[85vh] overflow-hidden rounded-2xl bg-black border border-slate-800 shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-200">
            <Dialog.Title className="sr-only">Image Zoom Preview</Dialog.Title>
            <Dialog.Description className="sr-only">Full view of the selected image.</Dialog.Description>
            <Dialog.Close asChild>
              <button
                className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/80 p-2 rounded-full transition-colors cursor-pointer z-10 outline-none"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </Dialog.Close>`;

content = content.replace(imageModalOld, imageModalNew);
content = content.replace(
  /<\/div>\n          <\/div>\n        <\/div>\n      \)}/,
  '</div>\n          </Dialog.Content>\n        </Dialog.Portal>\n      </Dialog.Root>'
);

// 4. INLINE CUSTOM DELETE CONFIRMATION MODAL
const deleteModalOld = `{deleteConfirmIndex !== null && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-xs z-[9999] flex items-center justify-center p-4 font-sans">
          <div className="bg-white border border-slate-200/90 shadow-2xl rounded-3xl p-6 sm:p-7 max-w-sm w-full space-y-5 text-left animate-in fade-in zoom-in-95 duration-205">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500 shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 grow">
                <h4 className="text-slate-900 font-extrabold text-sm uppercase tracking-wider">Delete Campaign</h4>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Are you sure you want to delete this promotional campaign? This action is permanent and cannot be undone.
                </p>
              </div>
            </div>`;

const deleteModalNew = `<Dialog.Root open={deleteConfirmIndex !== null} onOpenChange={(open) => !open && setDeleteConfirmIndex(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/45 backdrop-blur-xs z-[9999] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-[9999] max-w-sm w-full translate-x-[-50%] translate-y-[-50%] bg-white border border-slate-200/90 shadow-2xl rounded-3xl p-6 sm:p-7 space-y-5 text-left font-sans data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] duration-205">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-red-500 shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div className="space-y-1.5 grow">
                <Dialog.Title className="text-slate-900 font-extrabold text-sm uppercase tracking-wider">Delete Campaign</Dialog.Title>
                <Dialog.Description className="text-xs text-slate-500 font-medium leading-relaxed">
                  Are you sure you want to delete this promotional campaign? This action is permanent and cannot be undone.
                </Dialog.Description>
              </div>
            </div>`;

content = content.replace(deleteModalOld, deleteModalNew);
content = content.replace(
  /Delete\n              <\/button>\n            <\/div>\n          <\/div>\n        <\/div>\n      \)}/,
  'Delete\n              </button>\n            </div>\n          </Dialog.Content>\n        </Dialog.Portal>\n      </Dialog.Root>'
);

fs.writeFileSync(file, content);
console.log('Modals replaced successfully with Radix UI.');
