/* Glass Folder: fits itself to whatever box it is placed in */
document.querySelectorAll('.gf-box').forEach(function(box){
  var el=box.querySelector('.gf'),stage=el.querySelector('.gf-stage'),glass=el.querySelector('.gf-glass');

  function fit(){
    var s=Math.min(box.clientWidth/400,box.clientHeight/360);
    el.style.setProperty('--gf-scale',Math.max(.02,s).toFixed(3));
  }
  fit();
  if(window.ResizeObserver)new ResizeObserver(fit).observe(box);
  window.addEventListener('resize',fit);

  /* Mouse: tilt + moving glass highlight */
  el.addEventListener('mousemove',function(e){
    var r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    stage.style.setProperty('--gf-ry',((x-.5)*10)+'deg');
    stage.style.setProperty('--gf-rx',((.5-y)*8)+'deg');
    glass.style.setProperty('--gf-mx',(x*100)+'%');
    glass.style.setProperty('--gf-my',(y*100)+'%');
  });
  el.addEventListener('mouseleave',function(){
    stage.style.setProperty('--gf-rx','0deg');stage.style.setProperty('--gf-ry','0deg');
  });

  /* Touch screens have no hover: tap to open / close */
  el.addEventListener('click',function(){
    if(window.matchMedia('(hover:none)').matches)el.classList.toggle('is-open');
  });
});
