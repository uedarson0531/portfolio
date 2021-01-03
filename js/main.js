'use strict';

$(function () {

  const main = $('#main');
  const trigger = $('.js-trigger');
  

  // fade



  main.scroll(function () {
    trigger.each(function () {
      let triggerPoint = $(this).position().top*2;
      
      if (main.scrollTop() > triggerPoint) {
        $(this).find('.js-title').addClass('is-active')
        $(this).find('.js-fade-in').addClass('is-active');
      } else {
        $(this).find('.js-title').removeClass('is-active')
        $(this).find('.js-fade-in').removeClass('is-active');
      }
    });
  });


  // opening

  const opening = $('.opening');
  const openingDelay = 1500
  
  const overall = $('body,html');

  const percentText = $('#js-percent');
  let percentNum = 0;

  var percentUp = setInterval(function () {
    percentNum += 1;
    percentText.html(percentNum);
      
    if (percentNum == 100) {
      clearInterval(percentUp);
    }
        
  }, 8);

  opening.delay(openingDelay).fadeOut(1000, function () {
    overall.removeClass('js-hidden');
    $('#fv').find('.js-fade-in').addClass('is-active');
    $('#fv').find('.js-fv-title').addClass('is-active');
  });


  // back-to-top

  const btt = $('#btt');

  btt.click(function () {
    main.css({
      'scroll-snap-type': 'none',
    });
    main.animate({
      scrollTop: 0,
    }, 500, function () {
        main.css({
          'scroll-snap-type': 'y mandatory',
        });
    });
  });

  // swipe

  const swipe = $('.js-swipe');

  swipe.on('touchstart', start_check);

	swipe.on("touchmove", move_check);
 
	swipe.on("touchend", end_check);
 
	var moveY,moveX, posiY, posiX;

	function start_check(event) 
	{
		posiY = getY(event);
		posiX = getX(event);
 
		moveY = '';
		moveX = '';
	}
 

	function move_check(event)
	{
		if (posiX - getX(event) > 50) 
		{
			moveX = "left";
		}
		else if (posiX - getX(event) < -50)  
		{	
			moveX = "right";
		}
	}
 

	function end_check(event)
	{
		if (moveX == "left")
    {
      activetySlide();
		}
		else if (moveX == "right")
		{
      activetySlide();
		}
 
	}
 
 
	// 座標取得処理
	function getY(event) 
	{
		//縦方向の座標を取得
		return (event.originalEvent.touches[0].pageY);
	}
 
	function getX(event) 
	{
		//横方向の座標を取得
		return (event.originalEvent.touches[0].pageX);
  }


  
  // products拡大表示

  const ProductsImg = $('.products__item-img');
  const zoomBack = $('#zoom__back');
  const zoomItem = $('.zoom__item');

  ProductsImg.click(function () {
    let id = $(this).attr('id');
    $("." + id).fadeIn();
    zoomBack.fadeIn();
  });

  zoomBack.click(function () {
    zoomItem.fadeOut();
    zoomBack.fadeOut();
  });

  // activety next

  const activetyNext = $('.js-actvety-next');

  activetyNext.click(function () {
    activetySlide();
  });

  let nowPage = 0;
  let nextPage = 1;

  const activetyList = $('.activety__list');
  const activetyItem = $('.activety__item');


  const activetySlide = () => {
    activetyItem.eq(nowPage).addClass('is-active');
    activetyItem.eq(nowPage).delay(1000).queue(function () {
      $(this).appendTo(activetyList).dequeue();
    });
    activetyItem.eq(nowPage).delay(500).queue(function () {
      $(this).removeClass('is-active').dequeue();
    });
    // setTimeout(function () {
    //   // activetyList.append(activetyItem.eq(nowPage));
    //   activetyItem.eq(nowPage).removeClass('is-active');
    // },1000);
    nowPage = nextPage;
    nextPage = (nowPage + 1) % 2;
  }


});