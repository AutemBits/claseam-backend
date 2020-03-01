# ClaseAM (Backend) [![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)

This is the backend required for "ClaseAM" a "classroom-esque" open-source application.

## How-to use

You'll need to create a file called ".env" in the root folder of this project that contains a connection string to mongodb:

```
DB_CONNECT = <Connection String>
```

After that, you'll need to get a private key using openssl (place the file on the root of this project)

```bash
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out claseam.key
```

That's it! You now have a fully functional copy of this project

## Where's the frontend?

This project will be merging with it in the very near future

## License
This project is licensed under the MPL-2.0 - see the [LICENSE](LICENSE) file for details 