const valid=new Set(['simple','technical']);
const requested=new URLSearchParams(location.search).get('view');
let current=valid.has(requested)?requested:'simple';
const frame=document.getElementById('experience-frame');
const sourceFor=view=>view==='technical'?'overbark-dark.html':'overbark-beige.html';

// The presentation pages live inside this full-page iframe. App Store pages refuse
// to load in a frame, so make every store link perform a native top-level navigation.
// Setting the anchor target preserves Safari's user-gesture handling and App Store handoff.
frame.addEventListener('load',()=>{
  try{
    frame.contentDocument.querySelectorAll('a[href^="https://apps.apple.com/"]').forEach(anchor=>{
      anchor.target='_top';
      anchor.rel='noopener';
    });
  }catch(error){}
});

function render(view){
  if(!valid.has(view))view='simple';
  current=view;
  document.documentElement.dataset.view=view;
  document.querySelectorAll('[data-set-view]').forEach(button=>button.classList.toggle('active',button.dataset.setView===view));
  frame.src=sourceFor(view);
  try{history.replaceState({},'',`experience.html?view=${view}`)}catch(error){}
}

document.querySelectorAll('[data-set-view]').forEach(button=>button.addEventListener('click',()=>render(button.dataset.setView)));
render(current);
