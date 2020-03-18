# Fast.ai CNN Camera App
## Overview
This is a web app that allows a user to take a picture using an interface similar to a native camera app. 
After the picture is taken, it's sent to a fast.ai CNN model running on [render](https://www.render.com). 
The modified server will the return a classification of the image along with related content.

There are a handful of prebuilt apps that allow a user to upload a photo ([this](https://github.com/npatta01/web-deep-learning-classifier) and [this](https://github.com/render-examples/fastai-v3)), but I couldn't find an app that allowed the user to skip the step of manually uploading it.

I'd like to give a major shoutout to [@abenjamin765](https://github.com/abenjamin765) whose [tutorial/repo](https://github.com/abenjamin765/camera-app) was instrumental in creating this application. 

## Demo
Check out a demo app [here](https://tylernoblett.github.io/fastai-cnn-camera-app/). The demo app recognizes everyday objects (cars, people, trees, computers, chairs, pens, and chairs).

## Getting Started
To get started, fork this repo. A few things you'll need to change:
1. In `scripts.js`, change `const url` to the url for your render endpoint.
2. In `index.hmtl`, you may want to modify the starting app description (in `<p id="content">`), the header (`<h1 id="type">`), and the title `<title>`.
3. Follow [this guide](https://course.fast.ai/deployment_render.html) to set up your render server if you haven't already.
4. In `server.py` in your render repo, change this line `return JSONResponse({'result': str(prediction)})` to something like this. You can take a look at the server code for the demo project [here](https://github.com/TylerNoblett/fastai-v3/blob/master/app/server.py).
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
## Hosting
### Github Pages
The easiest solution is [github pages](https://pages.github.com/); however, your repo must either be public or you'll need a paid github plan. Within the repo go to settings and search for `github pages` to get started.

### Netlify
[Netlify](https://www.netlify.com/) is free and is only more marginally tedious to set up, and has a lot of great features that github pages doesn't have.

## In the pipeline
I'm hoping to add support for flask and create a template server you can use if you'd prefer to use the app without render.
Additionally, I'd like to make the content area within the app scrollable.
If you'd like to contribute, just submit a PR!

