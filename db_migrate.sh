echo "Doing my db migration table into mysql database"

# execute apache
exec "python manage.py db upgrade"