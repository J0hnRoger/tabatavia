# Stamplay Angular Seed Project
A starter project for Stamplay apps built with AngularJS

### Setup Instructions

- Clone project : `git clone https://github.com/Stamplay/stamplay-angular-seed.git`

- Install the project dependencies : `npm install` & `bower install`

- Configure Stamplay Project : Input your `APP ID` and `API KEY` from your Stamplay app dashboard in the corresponding properties in the `stamplay.json` file in the root of the seed project.

- Create a new **Object** schema on Stamplay, named "**note**", with a **body** property as a *string*.


### Running locally for development

- Start development build : `gulp dev`

- Start development server : `stamplay start` & navigate to `localhost:8080`

### Deploying the project

- Start production build : `gulp build`

- Run Stamplay CLI command : `stamplay deploy`

- Enter commit message for deploy.

#### Preview
<img src="https://cloud.githubusercontent.com/assets/7504299/12131415/3dddfb72-b3c7-11e5-97a0-f32766b8dc99.png" style="border:2px solid #eee;"/>
