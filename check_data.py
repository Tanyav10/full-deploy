from app import app, db, Enquiry , User

with app.app_context():
    print("=== Enquiries ===")
    for e in Enquiry.query.all():
        print(e.name, e.phone, e.email, e.interested_in, e.mode) 

    print("\n=== Users ===")
    for u in User.query.all():
        print(u.id , u.name , u.email , u.phone)