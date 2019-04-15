var words = [
"abruptly",
"absurd",
"abyss",
"affix",
"askew",
"avenue",
"awkward",
"axiom",
"azure",
"bagpipes",
"bandwagon",
"banjo",
"bayou",
"beekeeper",
"bikini",
"blitz",
"blizzard",
"boggle",
"bookworm",
"boxcar",
"boxful",
"buckaroo",
"buffalo",
"buffoon",
"buxom",
"buzzard",
"buzzing",
"buzzwords",
"caliph",
"cobweb",
"cockiness",
"croquet",
"crypt",
"curacao",
"cycle",
"daiquiri",
"dirndl",
"disavow",
"dizzying",
"duplex",
"dwarves",
"embezzle",
"equip",
"espionage",
"euouae",
"exodus",
"faking",
"fishhook",
"fixable",
"fjord",
"flapjack",
"flopping",
"fluffiness",
"flyby",
"foxglove",
"frazzled",
"frizzled",
"fuchsia",
"funny",
"gabby",
"galaxy",
"galvanize",
"gazebo",
"giaour",
"gizmo",
"glowworm",
"glyph",
"gnarly",
"gnostic",
"gossip"]

var word="", currentWord;
var lives;
var currentMinutes, currentSeconds;

var HTMLtimer, HTMLcurrentWord, HTMLnumberOfLives;

var clock=
{
	minutes:0,
	seconds:0,
	currentMinutes:0,
	currentSeconds:0,
	create:function(m,s)
	{
		clock.minutes=m;
		clock.seconds=s;
		clock.Reset();
	},
	Reset:function()
	{
		clock.currentMinutes=clock.minutes;
		clock.currentSeconds=clock.seconds;
	},
	isRunning:false,
	loseType:{noLivesLeft:1,outOfTime:2}
}

function displayTimer()
{
	var str="";
	if(clock.currentMinutes<=9)
		str+="0";
	str=clock.currentMinutes.toString()+":";
	if(clock.currentSeconds<=9)
		str+="0";
	str+=clock.currentSeconds.toString();
	
	HTMLtimer.innerHTML=str;
}

function myFunction()
{
	if(clock.isRunning)
	{
		if(clock.currentSeconds==0)
			{clock.currentMinutes--;clock.currentSeconds=59;}
		else clock.currentSeconds--;

		if(clock.currentSeconds==0&&clock.currentMinutes==0)
		{
			clock.isRunning=false;
			lose(clock.loseType.outOfTime);
			
		}
		displayTimer();
	}
}

function selectLetter(letter)
{
    var selectedLetter=document.getElementById(letter);
    selectedLetter.disabled=true;
	
	revealLettersInWord(letter);
}

function revealLettersInWord(letter)
{
	var count=0;
	for(var i=0;i<word.length;i++)
        if(letter==word[i])
        {
            currentWord=currentWord.substr(0,i)+letter+currentWord.slice(i+1);
            count++;
        }
    updateLives(count);
	checkWin();
	checkOutOfLives();
	
	displayWord();
}

function checkWin(numberOfLives,count)
{
    if(currentWord.search("_")==-1)
    {
		clock.isRunning=false;
		setAllButtonsDisabledOrNot(true);
		HTMLnumberOfLives.style.color="green";
		HTMLnumberOfLives.innerHTML=" YOU WON THE GAME!!!";
	}
}
 
function checkOutOfLives()
{
	if(lives==0)
	{
		clock.isRunning=false;
		lose(clock.loseType.noLivesLeft);
	}
}

function updateLives(numberOfMatchedLetters)
{
	if(numberOfMatchedLetters==0)
    {
        lives--;
        HTMLnumberOfLives.innerHTML=lives+" lives left.";
    }
}

function lose(type)
{
	setAllButtonsDisabledOrNot(true);
	HTMLnumberOfLives.style.color="red";
	if(type==clock.loseType.noLivesLeft)
		HTMLnumberOfLives.innerHTML="GAME OVER! No lives left. The word was: "+word;
	else if(type==clock.loseType.outOfTime)
		HTMLnumberOfLives.innerHTML="GAME OVER! Out of time. The word was: "+word;
}

function initializeApp()
{		
	HTMLtimer=document.getElementById("timer");
	HTMLcurrentWord=document.getElementById("currentWord");
	HTMLnumberOfLives = document.getElementById("numberOfLives");

	for(var i=0;i<words.length;i++)
		words[i]=words[i].toUpperCase();
	
	clock.create(1,0);
	clock.isRunning=true;
	newGame();
}

function newGame()
{
	clock.isRunning=true;
    clock.Reset();
	lives=5;
    
    if(word.length!=0)
        setAllButtonsDisabledOrNot(false);

    selectRandomWord();
    
    initializeCurrentWord();
	selectLetter(word.charAt(0));
    selectLetter(word.charAt(word.length-1));
    
	displayData();
}

function displayData()
{
	displayTimer();
	displayWord();
	displayLives();
}

function setAllButtonsDisabledOrNot(f)
{
    var i;
    var letters=document.getElementsByClassName("letter");
    for(i=0;i<letters.length;i++)
        letters[i].disabled =f;
}

function selectRandomWord()
{
    var r=Math.floor(Math.random()*words.length-1);
    word=words[r];
    var dom=document.getElementById("currentWord");
    currentWord="";
	initializeCurrentWord();
}

function initializeCurrentWord()
{
	currentWord="";
	for(var i=0;i<word.length;i++)
        currentWord+="_";
}

function displayWord()
{
	HTMLcurrentWord.innerHTML="";
	for(var i=0;i<word.length;i++)
		HTMLcurrentWord.innerHTML+=currentWord[i]+" ";
}

function displayLives()
{
	HTMLnumberOfLives.style.color="black";
    HTMLnumberOfLives.innerHTML=lives+" lives left.";
}