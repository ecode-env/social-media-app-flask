from app import create_app


app = create_app()


if '__main__' == __name__:
    app.run(debug=True)