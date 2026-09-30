(function(){
  const burger=document.getElementById('burger'),nav=document.getElementById('nav');
  if(burger&&nav) burger.addEventListener('click',()=>nav.classList.toggle('open'));
  const modal=document.getElementById('productModal');
  if(modal){
    const close=()=>{modal.classList.remove('open');document.body.classList.remove('modal-open')};
    const fill=(el)=>{
      const img=document.getElementById('modalImg');
      img.src=el.dataset.img||'';img.alt=el.querySelector('img')?.alt||'';img.classList.toggle('wide',el.classList.contains('cookie'));
      document.getElementById('modalTitle').textContent=el.dataset.title||'';
      document.getElementById('modalFlavor').textContent=el.dataset.flavor||'';
      document.getElementById('modalMeta').innerHTML=el.dataset.weight?'<span class="badge">'+el.dataset.weight+'</span>':'';
      document.getElementById('modalComp').textContent=el.dataset.comp||'Информация о составе предоставляется по запросу.';
      document.getElementById('modalNutri').innerHTML=['b','f','c','kcal'].map((k,i)=>'<div><strong>'+ (el.dataset[k]||'—') +'</strong><span>'+['белки','жиры','углеводы','энергия'][i]+'</span></div>').join('');
      document.getElementById('modalNote').textContent=((el.dataset.allergens||'')+' '+(el.dataset.note||'')).trim();
      modal.classList.add('open');document.body.classList.add('modal-open');
    };
    document.querySelectorAll('.pack[data-comp]').forEach(el=>{el.addEventListener('click',()=>fill(el));el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();fill(el)}})});
    document.getElementById('modalClose')?.addEventListener('click',close);modal.addEventListener('click',e=>{if(e.target===modal)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  }
  const tabs=document.querySelectorAll('.line-tab'),lines=document.querySelectorAll('.product-line');
  if(tabs.length){const activate=(name)=>{tabs.forEach(t=>t.classList.toggle('active',t.dataset.line===name));lines.forEach(l=>l.classList.toggle('active',l.id==='line-'+name));filterProducts()};tabs.forEach(tab=>tab.addEventListener('click',()=>activate(tab.dataset.line)));const hash=(location.hash||'').replace('#','');if(['peanuts','cookies','candies'].includes(hash))activate(hash);}
  const search=document.getElementById('productSearch');
  function filterProducts(){if(!search)return;const q=search.value.toLowerCase().trim();let visible=0;document.querySelectorAll('.product-line.active .pack').forEach(card=>{const text=card.innerText.toLowerCase();const ok=!q||text.includes(q);card.hidden=!ok;if(ok)visible++});const empty=document.getElementById('catalogEmpty');if(empty)empty.style.display=visible?'none':'block'}
  search?.addEventListener('input',filterProducts);
  document.getElementById('clearSearch')?.addEventListener('click',()=>{search.value='';filterProducts();search.focus()});
  const form=document.getElementById('contactForm');
  if(form){const btn=document.getElementById('contactSubmit'),status=document.getElementById('formStatus');form.addEventListener('submit',async e=>{e.preventDefault();status.textContent='';status.className='form-status';btn.disabled=true;btn.textContent='Отправка…';const data=new FormData(form);data.append('_subject','Заявка с сайта DAYMARK');data.append('_template','table');data.append('_captcha','false');try{const res=await fetch('https://formsubmit.co/ajax/prutkovsky118818@yandex.ru',{method:'POST',body:data,headers:{Accept:'application/json'}});if(!res.ok)throw new Error();status.textContent='Заявка отправлена. Мы свяжемся с вами.';status.className='form-status ok';form.reset()}catch(err){status.innerHTML='Не удалось отправить автоматически. <a class="contact-link" href="mailto:prutkovsky118818@yandex.ru">Напишите нам по email</a>.';status.className='form-status err'}finally{btn.disabled=false;btn.textContent='Отправить заявку'}})}
})();
