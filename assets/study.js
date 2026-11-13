document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.practice-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const hidden = document.body.classList.toggle('practice-mode');
      toggle.setAttribute('aria-pressed', String(hidden));
      toggle.textContent = hidden ? 'Show worked solutions' : 'Practice mode: hide worked solutions';
      toggle.focus();
    });
  }
  const filter = document.getElementById('site-filter');
  const count = document.getElementById('filter-count');
  if (filter) {
    const cards = [...document.querySelectorAll('.catalog-item')];
    const apply = () => {
      const q = filter.value.toLocaleLowerCase().trim();
      let matched = 0;
      for (const c of cards) {
        const good = c.textContent.toLocaleLowerCase().includes(q);
        c.hidden = !good;
        if (good) matched++;
      }
      if (count) count.textContent = q ? `${matched} of ${cards.length} pages match “${filter.value}”.` : `All ${cards.length} pages shown.`;
    };
    filter.addEventListener('input', apply);
    apply();
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault(); filter.focus(); filter.select();
      }
    });
  }
});


// Per-question study controls: hide all answers once, then reveal individual ones.
document.addEventListener('DOMContentLoaded',()=>{
 const blocks=[...document.querySelectorAll('.prose .solution-content')];
 if(!blocks.length) return;
 const entries=[];
 blocks.forEach((block,i)=>{
   const id=block.id || `worked-answer-${i+1}`;
   block.id=id;
   const b=document.createElement('button');
   b.type='button';b.className='reveal-one';b.textContent='Reveal this worked solution';
   b.setAttribute('aria-controls',id);b.setAttribute('aria-expanded','false');
   block.parentNode.insertBefore(b,block);
   entries.push([b,block]);
   b.addEventListener('click',()=>{
     if(!document.body.classList.contains('practice-mode'))return;
     const shown=block.classList.toggle('individually-shown');
     b.textContent=shown?'Hide this worked solution':'Reveal this worked solution';
     b.setAttribute('aria-expanded',String(shown));
   });
 });
 const global=document.querySelector('.practice-toggle');
 if(global)global.addEventListener('click',()=>{
   entries.forEach(([b,block])=>{
     block.classList.remove('individually-shown');
     b.textContent='Reveal this worked solution';b.setAttribute('aria-expanded','false');
   });
 });
});
