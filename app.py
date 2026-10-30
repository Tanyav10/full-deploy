from flask import Flask, render_template, request, session , redirect , url_for
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///yoga.db"
app.secret_key = "yoga-secret-key-change-later"
db = SQLAlchemy(app)

class Enquiry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    email = db.Column(db.String(120))
    interested_in = db.Column(db.String(100))
    mode = db.Column(db.String(50))
    message = db.Column(db.String(500))

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(120), unique=True)
    phone = db.Column(db.String(20))
    password = db.Column(db.String(200))

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    return render_template("index.html")

@app.route("/enquiry", methods=["POST"])
def enquiry():
    name = request.form["name"]
    phone = request.form["phone"]
    email = request.form["email"]
    interested_in = request.form["interested_in"]
    mode = request.form["mode"]
    message = request.form.get("message", "")

    new_enquiry = Enquiry(
        name=name,
        phone=phone,
        email=email,
        interested_in=interested_in,
        mode=mode,
        message=message
    )

    db.session.add(new_enquiry)
    db.session.commit()

    return render_template("index.html", enquiry_success=True)

@app.route("/signup", methods=["POST"])
def signup():            
    name = request.form["name"]
    email = request.form["email"]
    phone = request.form["phone"]
    password = request.form["password"]

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return render_template("index.html", signup_error="This email is already registered.")

    hashed_password = generate_password_hash(password)
    new_user = User(name=name, email=email, phone=phone, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()   

    return render_template("index.html", auth_success=True)

@app.route("/login", methods=["POST"])
def login():
    email = request.form["email"]
    password = request.form["password"]

    user = User.query.filter_by(email=email).first()


    if user and check_password_hash(user.password, password):
        session["user_id"] = user.id
        session["user_name"] = user.name
        return render_template("index.html", auth_success=True)
    else:
        return render_template("index.html", login_error="Invalid email or password.")

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("home"))


if __name__ == "__main__":
    app.run(debug=True , host="0.0.0.0")