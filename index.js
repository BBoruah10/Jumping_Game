document.addEventListener('DOMContentLoaded',() => {
    const grid=document.getElementById('grid');
    const doodler=document.createElement('div');
    let platforms=[];
    
    let isGameOver=false;
    let doodlerLeftSpace= 50;
    let doodlerBottomSpace= 150;//keep on chnaging as the doodler moves up or down//starting 150
    let score=0;
    let isJumping = true;
    let upTimerId;
    let downTimerId;
    let isGoingLeft = false;
    let isGoingRight = false;
    let leftTimerdId;
    let rightTimerId;

    let startPoint = 150;//same as doodler bottom space

    class Platform{
        constructor(newPlatformBottom){
            this.left=Math.random() *300;//grid r width=400...platform=100(400-100)
            this.bottom=newPlatformBottom;
            this.visual=document.createElement('div');

            const visual = this.visual;
            visual.classList.add('platform');
            visual.style.left=this.left+'px';
            visual.style.bottom=this.bottom +'px';
            grid.appendChild(visual);
        }

    }
    function createPlatform(){
        for(let i=0;i<5;i++){
            let platGap = 600/5;
            let newPlatformBottom=100+i*platGap;
            let newPlatform=new Platform(newPlatformBottom);
            platforms.push(newPlatform);//branch of differnt attributes
            //console.log(platforms)
        }

    }
    function movePlatforms(){
    
            platforms.forEach(platform => {
                //console.log(platform.bottom);
                platform.bottom = platform.bottom-4;
                
                let visual=platform.visual;
                visual.style.bottom=platform.bottom + 'px';

                if (platform.bottom < 10) {
                    let firstPlatform = platforms[0].visual;
                    firstPlatform.classList.remove('platform');
                    platforms.shift();
                    //console.log('1',platforms)//eta platform remove kore
                    score++;
                    let newPlatform=new Platform(650)
                    platforms.push(newPlatform)
                    //console.log('2',platforms)//add kori jai eta eta ke
                }
            });
            
        
    }

    function createDoodler()
    {
        grid.appendChild(doodler);
        doodler.classList.add("doodler");
        doodlerLeftSpace=platforms[0].left;
        doodler.style.left=doodlerLeftSpace+'px';
        doodler.style.bottom=doodlerBottomSpace +'px';//bottom r pora kiman uprt thakibo
        //our left positioning will depend on where the platform is...and we will add 5 platforms..and we will calculate the height
        
        
    }
    function fall(){
        isJumping = false;
        clearTimeout(upTimerId);
        downTimerId=setInterval(() =>{
            doodlerBottomSpace-=5;
            doodler.style.bottom=doodlerBottomSpace+'px';
            if(doodlerBottomSpace <= 0){
                gameOver();

            }
            platforms.forEach(platform=>{
                if(
                    (doodlerBottomSpace>=platform.bottom)&&
                    (doodlerBottomSpace<=(platform.bottom+15))&&
                    ((doodlerLeftSpace + 60)>=platform.left)&&
                    (doodlerLeftSpace<=(platform.left+85))&&
                    !isJumping


                ){
                    startPoint=doodlerBottomSpace;
                    jump();
                    console.log('startPoint',startPoint);
                    isJumping=true;
                }
            })
        },30)
    }
    function jump(){
        clearInterval(downTimerId);
        isJumping = true;
        
        upTimerId=setInterval(() =>{
            doodlerBottomSpace+=20;
            doodler.style.bottom=doodlerBottomSpace+'px';
            if(doodlerBottomSpace>startPoint +200){
                fall();
                isJumping=false;
            }
            
        },35);
    }

    function moveLeft(){
        if(isGoingLeft){
            clearInterval(rightTimerId);
            isGoingRight=false;

        }
        isGoingLeft=true;
        leftTimerdId=setInterval(()=>{
            if(doodlerLeftSpace>=0){
                console.log('going ledt');
                doodlerLeftSpace-=5;
                doodler.style.left=doodlerLeftSpace+'px';
            }else{
                moveRight();
            }
        },30)
    }
    function moveRight(){
        if(isGoingLeft){
            clearInterval(leftTimerdId);
            isGoingLeft=false;
        }
        isGoingRight=true;
        rightTimerId=setInterval(()=>{
            if(doodlerLeftSpace<=313){
                console.log('going right');
                doodlerLeftSpace+=5;
                doodler.style.left=doodlerLeftSpace+'px';
            }else{
                moveLeft();
            }
        },30)

    }
    function moveStraight(){
        isGoingLeft=false;
        isGoingRight=false;
        clearInterval(rightTimerId);
        clearInterval(leftTimerdId);
    }
    function control(e){
        doodler.style.bottom=doodlerBottomSpace+'px';
        if(e.key ==='ArrowLeft'){
            moveLeft();
        }else if(e.key ==='ArrowRight'){
            moveRight();
        }else if(e.key === 'ArrowUp'){
            moveStraight();
        }
    }
    function gameOver(){
        isGameOver=true;
        while(grid.firstChild){
            grid.removeChild(grid.firstChild)
        }
        grid.innerHTML=score;
        clearInterval(downTimerId);
        clearInterval(upTimerId);
        clearInterval(leftTimerdId);
        clearInterval(rightTimerId);

    }
    function start(){
        if(!isGameOver){
            createPlatform();
            createDoodler();
            setInterval(movePlatforms,30);
            jump();
            document.addEventListener('keyup',control);
        }
    }

    start();  

})