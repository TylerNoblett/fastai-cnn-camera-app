# Overview
This is a web app that allows a user to take a picture and send it to a fast.ai CNN model running on [render](render.com). 
The modified render.com server will the return a classification of the image along with any related text.

I'd like to give a major shoutout to @abenjamin765 whose [tutorial/repo](https://github.com/abenjamin765/camera-app) was instrumental in creating this application. 

## Demo
Check out a demo app [here](https://tylernoblett.github.io/fastai-cnn-camera-app/). The app recognizes everyday objects (cars, people, trees, computers, chairs, etc).

## Getting Started
To get started, fork this repo. A few things you'll need to change:
1. In `scripts.js`, change `const url = "https://dc2.onrender.com/analyze"` to the url for your render endpoint.
2. In `index.hmtl`, you may want to modify the starting app description (in `<p id="content">`), the header (`<h1 id="type">`), and the title `<title>`.
3. Follow [this guide](https://course.fast.ai/deployment_render.html) to set up your render server if you haven't already.
4. In `server.py` in your render repo, change this line `return JSONResponse({'result': str(prediction)})` to something like this
```
# change the prediction into a string and capitalize it
# to map it to items to grab the description
prediction = str(prediction).capitalize()	
# Items contains the description text for each result
items = {	
    'Tree': 'Trees are great!', 	
    'Person': 'If you are reading this, you too are a person', 	
    'Car': '4 wheels is all you need',	
    'Computer': 'A very useful tool',	
    'Pen': 'Useful for writing something down!',	
    'Desk': 'The perfect place to put your things',	
    'Chair': 'Ideal for sitting'	
}	
return JSONResponse({	
    'result': prediction,	
    'content': items[prediction]	
})
```

## In the pipeline
I'm hoping to add support for flask and create a template server you can use if you'd prefer to use the app without render.
Additionally, I'd like to make the content area within the app scrollable.
If you'd like to contribute, just submit a PR!

