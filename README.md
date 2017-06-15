# django-boilerplate

A Django boilerplate that uses:

1. Bootstrap for styling
2. JQuery and Bootstrap for scripting
3. Grunt for automating
4. Node for package managing
5. Social login for Google, Facebook, and Linkedin

## Setup

1. Install python requirements using `pip install -r requirements.txt`
2. Migrate your models using `python manage.py migrate`
3. Install node requirements using `npm install`
4. Build your static files by running `grunt build`
5. Start your Django server by running `python manage.py runserver`
6. Open another console tab and run `grunt` to watch for SASS and JS file changes
7. Setup your Google, Facebook, and Linkedin applications for django-social login and set app keys and secrets in your env (check settings/base.py for the needed variables)
8. Navigate to `/`
