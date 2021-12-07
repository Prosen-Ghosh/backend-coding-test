'use strict';

const express = require('express');
const app = express();
const port = 8010;

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const buildSchemas = require('./src/schemas');
const expressJSDocSwagger = require('express-jsdoc-swagger');

const options = {
	info: {
		version: '1.0.0',
		title: 'Backend Code Test',
		description: 'Xendit Coding Exercise'
	},
	baseDir: __dirname,
	// Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
	filesPattern: './documentation/doc.js',
	// URL where SwaggerUI will be rendered
	swaggerUIPath: '/api-docs',
	// Expose OpenAPI UI
	exposeSwaggerUI: true,
	// Expose Open API JSON Docs documentation in `apiDocsPath` path.
	exposeApiDocs: false,
	// Open API JSON Docs endpoint.
	apiDocsPath: '/api-docs',
	// Set non-required fields as nullable by default
	notRequiredAsNullable: false,
	// You can customize your UI options.
	// you can extend swagger-ui-express config. You can checkout an example of this
	// in the `example/configuration/swaggerOptions.js`
	swaggerUiOptions: {},
	servers: [
		{
			url: `http://localhost:${port}`,
			description: 'Local development server'
		}
	]
};
db.serialize(() => {
    buildSchemas(db);

    const app = require('./src/app')(db);
    expressJSDocSwagger(app)(options);

    app.listen(port, () => console.log(`App started and listening on port ${port}`));
});