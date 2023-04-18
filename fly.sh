git add .

msg="ref: at `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi

git commit -m "$msg"

git push -u origin main