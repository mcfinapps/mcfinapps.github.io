const valid=new Set(['simple','technical']);
const requested=new URLSearchParams(location.search).get('view');
let current=valid.has(requested)?requested:'simple';
const frame=document.getElementById('experience-frame');
const sourceFor=view=>view==='technical'?'overbark-dark.html':'overbark-beige.html';

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
