# plantparent

PlantParent is an application built for teaching the basics of React and Ruby on Rails as an API 

## Backend_project_name**(needs to be renamed)
This is the Ruby on Rails backend.
**EndPoints** :
```
        /api/v1/users
        POST: Creates Users on Sign-up
		/api/v1/login
			POST: authorize Users on Login
		/api/v1/profile
			GET: redirects to users profile 
		/plants
			GET: will fetch all plants
			POST: will create a plant
		/plants:id
			GET: will fetch plant with specific id
			PATCH/PUT: will update plant with matching id
			DELETE: will delete plant with matching id
```          
## To run server:
```
	rails s  
```
## To run app
```
	npm run start
```

## Components
	App: Currently holding plant and loging state
	Form: Renders Form to add plants
	Login: Renders Auth and Sign-up form
	Plants: Renders Plants Card
	PlantCard: render single plant
