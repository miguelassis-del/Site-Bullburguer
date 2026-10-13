(function(){
  var $=function(s){return document.querySelector(s)};
  window.addEventListener('load',function(){setTimeout(function(){$('#loader').classList.add('done')},500)});
  setTimeout(function(){$('#loader').classList.add('done')},2500);
  $('#year').textContent=new Date().getFullYear();

  var header=$('#header');
  var onScroll=function(){header.classList.toggle('scrolled',window.scrollY>40)};
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  var btn=$('#menuBtn'),nav=$('#nav');
  btn.addEventListener('click',function(){
    var o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o);
  });
  nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open');btn.setAttribute('aria-expanded',false)})});

  // brasas subindo no hero
  var box=$('#embers');
  for(var i=0;i<26;i++){
    var e=document.createElement('i');e.className='ember';
    e.style.left=Math.random()*100+'%';
    e.style.setProperty('--dx',(Math.random()*120-60)+'px');
    e.style.animationDuration=(6+Math.random()*8)+'s';
    e.style.animationDelay=(Math.random()*8)+'s';
    var s=2+Math.random()*4;e.style.width=e.style.height=s+'px';
    box.appendChild(e);
  }

  // entrada suave dos blocos
  var items=document.querySelectorAll('.card,.photos,.shop,.map,.app,.title,.lead');
  items.forEach(function(el,i){el.classList.add('reveal');el.style.transitionDelay=(el.classList.contains('card')?(i%3)*90:0)+'ms'});
  var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{threshold:.15});
  items.forEach(function(el){io.observe(el)});

  // contadores
  var co=new IntersectionObserver(function(es){es.forEach(function(en){
    if(!en.isIntersecting)return;
    var el=en.target,end=+el.dataset.count,t0=null;
    (function step(t){t0=t0||t;var p=Math.min((t-t0)/1400,1);el.textContent=Math.round(end*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(step)})(performance.now());
    co.unobserve(el);
  })},{threshold:.6});
  document.querySelectorAll('[data-count]').forEach(function(el){co.observe(el)});
})();
