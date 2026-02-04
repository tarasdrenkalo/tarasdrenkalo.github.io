document.addEventListener("DOMContentLoaded", ()=>{
  HighlightDialog.Init();
  DescriptionTextBox.Init();
  ArticleTextBox.Init();
  HighlightDialog.Init();
  ChemDialog.Init();
  LinkDialog.Init();
});
const HighlightDialog = {
  Selector:"dialog#d-highlight",
  TxtInput:{
    Selector:"input#d-hl-txt",
  },
  ClrInput:{
    Selector:"input#d-hl-clr",
  },
  Init:()=>{
    const OpenedBy = document.querySelector(HighlightDialog.OpenedBy.Selector);
    const ClosedBy = document.querySelector(HighlightDialog.ClosedBy.Selector);
    const assertion = OpenedBy instanceof HTMLButtonElement && ClosedBy instanceof HTMLButtonElement;
    if(!assertion) return;
    OpenedBy.addEventListener("click", HighlightDialog.OpenedBy.OnClick);
    ClosedBy.addEventListener("click", HighlightDialog.ClosedBy.OnClick);
  },
  OpenedBy: {
    Selector:"button#cont-btn-h",
    OnClick:()=>{
      const dialog = document.querySelector(HighlightDialog.Selector);
      const arttextbox = document.querySelector(ArticleTextBox.Selector);
      const TxtInput = document.querySelector(HighlightDialog.TxtInput.Selector);
      const ClrInput = document.querySelector(HighlightDialog.ClrInput.Selector);
      const assertion = dialog instanceof HTMLDialogElement &&
      arttextbox instanceof HTMLTextAreaElement &&
      TxtInput instanceof HTMLInputElement &&
      ClrInput instanceof HTMLInputElement;
      if(!assertion) return;
      TxtInput.value = arttextbox.value.substring(arttextbox.selectionStart, arttextbox.selectionEnd);
      dialog.showModal();
    },
  },
  ClosedBy: {
    Selector:"button#d-h-sbmt",
    OnClick:()=>{
      const dialog = document.querySelector(HighlightDialog.Selector);
      const arttextbox = document.querySelector(ArticleTextBox.Selector);
      const TxtInput = document.querySelector(HighlightDialog.TxtInput.Selector);
      const ClrInput = document.querySelector(HighlightDialog.ClrInput.Selector);
      const assertion = dialog instanceof HTMLDialogElement &&
      arttextbox instanceof HTMLTextAreaElement &&
      TxtInput instanceof HTMLInputElement &&
      ClrInput instanceof HTMLInputElement;
      if(!assertion) return;
      dialog.close(`<h colour="${ClrInput.value}">${TxtInput.value}</h>`);
      arttextbox.value = arttextbox.value.substring(0, arttextbox.selectionStart) + dialog.returnValue + arttextbox.value.substring(arttextbox.selectionEnd, arttextbox.value.length);
    },
  },
}

const ChemDialog = {
  Selector:"dialog#d-chem",
  ChemInput:{
    Selector:"input#d-a-chem",
  },
  Init:()=>{
    const OpenedBy = document.querySelector(ChemDialog.OpenedBy.Selector);
    const ClosedBy = document.querySelector(ChemDialog.ClosedBy.Selector);
    const assertion = OpenedBy instanceof HTMLButtonElement && ClosedBy instanceof HTMLButtonElement;
    //if(!assertion) return;
    OpenedBy.addEventListener("click", ChemDialog.OpenedBy.OnClick);
    ClosedBy.addEventListener("click", ChemDialog.ClosedBy.OnClick);
  },
  OpenedBy: {
    Selector:"button#cont-btn-c",
    OnClick:()=>{
      const dialog = document.querySelector(ChemDialog.Selector);
      const arttextbox = document.querySelector(ArticleTextBox.Selector);
      const ChemInput = document.querySelector(ChemDialog.ChemInput.Selector);
      const assertion = dialog instanceof HTMLDialogElement &&
      arttextbox instanceof HTMLTextAreaElement &&
      ChemInput instanceof HTMLInputElement;
      //if(!assertion) return;
      ChemInput.value = arttextbox.value.substring(arttextbox.selectionStart, arttextbox.selectionEnd);
      dialog.showModal();
    },
  },
  ClosedBy: {
    Selector:"button#d-chem-sbmt",
    OnClick:()=>{
      const dialog = document.querySelector(ChemDialog.Selector);
      const arttextbox = document.querySelector(ArticleTextBox.Selector);
      const ChemInput = document.querySelector(ChemDialog.ChemInput.Selector);
      const assertion = dialog instanceof HTMLDialogElement &&
      arttextbox instanceof HTMLTextAreaElement &&
      ChemInput instanceof HTMLInputElement;
      //if(!assertion) return;
      dialog.close(`<chem>${ChemInput.value}</chem>`);
      arttextbox.value = arttextbox.value.substring(0, arttextbox.selectionStart) + dialog.returnValue + arttextbox.value.substring(arttextbox.selectionEnd, arttextbox.value.length);
    },
  },
}

const LinkDialog = {
  Selector:"dialog#d-anchor",
  TxtInput:{
    Selector:"input#d-a-txt",
  },
  UrlInput:{
    Selector:"input#d-a-href",
  },
  DiffInput:{
    Selector:"input#d-a-diff",
  },
  Init:()=>{
    const OpenedBy = document.querySelector(LinkDialog.OpenedBy.Selector);
    const ClosedBy = document.querySelector(LinkDialog.ClosedBy.Selector);
    const assertion = OpenedBy instanceof HTMLButtonElement && ClosedBy instanceof HTMLButtonElement;
    if(!assertion) return;
    OpenedBy.addEventListener("click", LinkDialog.OpenedBy.OnClick);
    ClosedBy.addEventListener("click", LinkDialog.ClosedBy.OnClick);
  },
  OpenedBy: {
    Selector:"button#cont-btn-a",
    OnClick:()=>{
      const dialog = document.querySelector(LinkDialog.Selector);
      const arttextbox = document.querySelector(ArticleTextBox.Selector);
      const TxtInput = document.querySelector(LinkDialog.TxtInput.Selector);
      const UrlInput = document.querySelector(LinkDialog.UrlInput.Selector);
      const DiffInput = document.querySelector(LinkDialog.DiffInput.Selector);
      const assertion = dialog instanceof HTMLDialogElement &&
      arttextbox instanceof HTMLTextAreaElement &&
      TxtInput instanceof HTMLInputElement &&
      UrlInput instanceof HTMLInputElement &&
      DiffInput instanceof HTMLInputElement;
      if(!assertion) return;
      TxtInput.value = arttextbox.value.substring(arttextbox.selectionStart, arttextbox.selectionEnd);
      dialog.showModal();
    },
  },
  ClosedBy: {
    Selector:"button#d-a-sbmt",
    OnClick:()=>{
      const dialog = document.querySelector(LinkDialog.Selector);
      const arttextbox = document.querySelector(ArticleTextBox.Selector);
      const TxtInput = document.querySelector(LinkDialog.TxtInput.Selector);
      const UrlInput = document.querySelector(LinkDialog.UrlInput.Selector);
      const DiffInput = document.querySelector(LinkDialog.DiffInput.Selector);
      const assertion = dialog instanceof HTMLDialogElement &&
      arttextbox instanceof HTMLTextAreaElement &&
      TxtInput instanceof HTMLInputElement &&
      UrlInput instanceof HTMLInputElement &&
      DiffInput instanceof HTMLInputElement;
      if(!assertion) return;
      dialog.close(`<a title="${TxtInput.value}" href="${UrlInput.value}" target="${DiffInput.checked ? "_blank":"_self"}">${TxtInput.value}</a>`);
      arttextbox.value = arttextbox.value.substring(0, arttextbox.selectionStart) + dialog.returnValue + arttextbox.value.substring(arttextbox.selectionEnd, arttextbox.value.length);
    },
  },
}


const DescriptionTextBox = {
  Selector:"textarea#adesc",
  Init:()=>{
    const f = document.querySelector(DescriptionTextBox.Selector);
    if(!(f instanceof HTMLTextAreaElement)) return;
    const b = document.querySelector(DescriptionTextBox.Bold.Selector);
    const i = document.querySelector(DescriptionTextBox.Italics.Selector);
    const u = document.querySelector(DescriptionTextBox.Underline.Selector);
    const s = document.querySelector(DescriptionTextBox.Strike.Selector);
    const assertion = b instanceof HTMLButtonElement &&
    i instanceof HTMLButtonElement &&
    u instanceof HTMLButtonElement &&
    s instanceof HTMLButtonElement;
    if(!assertion) return;
    b.addEventListener("click", DescriptionTextBox.Bold.OnClick);
    i.addEventListener("click", DescriptionTextBox.Italics.OnClick);
    u.addEventListener("click", DescriptionTextBox.Underline.OnClick);
    s.addEventListener("click", DescriptionTextBox.Strike.OnClick);
  },
  OnInput:()=>{},
  ContentDOM:()=>{document.createElement("p");},
  Bold:{
    Selector:"button#desc-btn-b",
    OnClick:()=>{
      const txtarea = document.querySelector(DescriptionTextBox.Selector);
      if(!(txtarea instanceof HTMLTextAreaElement)) return;
      txtarea.value = txtarea.value.substring(0, txtarea.selectionStart) 
      +`<b>`+txtarea.value.substring(txtarea.selectionStart, txtarea.selectionEnd)
      +`</b>`+txtarea.value.substring(txtarea.selectionEnd, txtarea.value.length);
    }
  },
  Italics:{
    Selector:"button#desc-btn-i",
    OnClick:()=>{
      const txtarea = document.querySelector(DescriptionTextBox.Selector);
      if(!(txtarea instanceof HTMLTextAreaElement)) return;
      txtarea.value = txtarea.value.substring(0, txtarea.selectionStart) 
      +`<i>`+txtarea.value.substring(txtarea.selectionStart, txtarea.selectionEnd)
      +`</i>`+txtarea.value.substring(txtarea.selectionEnd, txtarea.value.length);
    }
  },
  Underline:{
    Selector:"button#desc-btn-u",
    OnClick:()=>{
      const txtarea = document.querySelector(DescriptionTextBox.Selector);
      if(!(txtarea instanceof HTMLTextAreaElement)) return;
      txtarea.value = txtarea.value.substring(0, txtarea.selectionStart) 
      +`<u>`+txtarea.value.substring(txtarea.selectionStart, txtarea.selectionEnd)
      +`</u>`+txtarea.value.substring(txtarea.selectionEnd, txtarea.value.length);
    }
  },
  Strike:{
    Selector:"button#desc-btn-s",
    OnClick:()=>{
      const txtarea = document.querySelector(DescriptionTextBox.Selector);
      if(!(txtarea instanceof HTMLTextAreaElement)) return;
      txtarea.value = txtarea.value.substring(0, txtarea.selectionStart) 
      +`<s>`+txtarea.value.substring(txtarea.selectionStart, txtarea.selectionEnd)
      +`</s>`+txtarea.value.substring(txtarea.selectionEnd, txtarea.value.length);
    }
  },
}
// TODO

const ArticleTextBox = {
  Selector:"textarea#acontent",
  Init:()=>{
    const f = document.querySelector(ArticleTextBox.Selector);
    if(!(f instanceof HTMLTextAreaElement)) return;
    const b = document.querySelector(ArticleTextBox.Bold.Selector);
    const i = document.querySelector(ArticleTextBox.Italics.Selector);
    const u = document.querySelector(ArticleTextBox.Underline.Selector);
    const s = document.querySelector(ArticleTextBox.Strike.Selector);
    const assertion = b instanceof HTMLButtonElement &&
    i instanceof HTMLButtonElement &&
    u instanceof HTMLButtonElement &&
    s instanceof HTMLButtonElement;
    if(!assertion) return;
    b.addEventListener("click", ArticleTextBox.Bold.OnClick);
    i.addEventListener("click", ArticleTextBox.Italics.OnClick);
    u.addEventListener("click", ArticleTextBox.Underline.OnClick);
    s.addEventListener("click", ArticleTextBox.Strike.OnClick);
  },
  OnInput:()=>{},
  ContentDOM:()=>{document.createElement("article");},
  Bold:{
    Selector:"button#cont-btn-b",
    OnClick:()=>{
      const txtarea = document.querySelector(ArticleTextBox.Selector);
      if(!(txtarea instanceof HTMLTextAreaElement)) return;
      txtarea.value = txtarea.value.substring(0, txtarea.selectionStart) 
      +`<b>`+txtarea.value.substring(txtarea.selectionStart, txtarea.selectionEnd)
      +`</b>`+txtarea.value.substring(txtarea.selectionEnd, txtarea.value.length);
    }
  },
  Italics:{
    Selector:"button#cont-btn-i",
    OnClick:()=>{
      const txtarea = document.querySelector(ArticleTextBox.Selector);
      if(!(txtarea instanceof HTMLTextAreaElement)) return;
      txtarea.value = txtarea.value.substring(0, txtarea.selectionStart) 
      +`<i>`+txtarea.value.substring(txtarea.selectionStart, txtarea.selectionEnd)
      +`</i>`+txtarea.value.substring(txtarea.selectionEnd, txtarea.value.length);
    }
  },
  Underline:{
    Selector:"button#cont-btn-u",
    OnClick:()=>{
      const txtarea = document.querySelector(ArticleTextBox.Selector);
      if(!(txtarea instanceof HTMLTextAreaElement)) return;
      txtarea.value = txtarea.value.substring(0, txtarea.selectionStart) 
      +`<u>`+txtarea.value.substring(txtarea.selectionStart, txtarea.selectionEnd)
      +`</u>`+txtarea.value.substring(txtarea.selectionEnd, txtarea.value.length);
    }
  },
  Strike:{
    Selector:"button#cont-btn-s",
    OnClick:()=>{
      const txtarea = document.querySelector(ArticleTextBox.Selector);
      if(!(txtarea instanceof HTMLTextAreaElement)) return;
      txtarea.value = txtarea.value.substring(0, txtarea.selectionStart) 
      +`<s>`+txtarea.value.substring(txtarea.selectionStart, txtarea.selectionEnd)
      +`</s>`+txtarea.value.substring(txtarea.selectionEnd, txtarea.value.length);
    }
  },
}


const re = /(A[cglmr-u]|B[aehikr]?|C[adefl-orsu]?|D[bsy]|E[rsu]|F[elmr]?|G[ade]|H[efgos]?|I[nr]?|Kr?|L[airuv]|M[dgont]|N[abdeiop]?|Os?|P[abdmortu]?|R[abe-hnu]|S[bcegimnr]?|T[abcehilm]|U(?:u[opst])?|V|W|Xe|Yb?|Z[nr])(\d+)?/g;
function formatFormula(s) {
  return s.replace(
    re,
    (_, el, num) => num ? `${el}<sub>${num}</sub>` : el
  );
}
console.log(formatFormula("NO2"));
console.log(formatFormula("Al2O3"));