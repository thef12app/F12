const fs = require('fs');
const path = require('path');

enum FeatureList {
  addFeature = 'addFeature',
  removeFeature = 'removeFeature',
}
const _args = process.argv.slice(2);

switch (_args[0]) {
  case FeatureList.addFeature:
    addFeature(_args);
    break;
  default:
    console.log('No known arguments');
}

function addFeature(args: string[]) {
  enum options {
    name = 'name',
    icon = 'icon',
  }
  const required = [options.name];
  const helpText =
    'Usage: yarn run add:feature name:<featureName> icon:<featureIcon>\n \t name is required. \t icon value is optional and should be a valid antd icon name';
  const [, featureName, featureIcon] = args;
  const params: { [key: string]: string } = [featureName, featureIcon]
    .filter(Boolean)
    .map(getArgsAndValue)
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
  if (!validateRequiredParams(required, Object.keys(params), helpText)) {
    return;
  }

  const templateComponent = `
  import React from 'react';

  export const ${params.name} = () => {
    return <div> Wow New Feature </div>;
  };
    `;

  fs.mkdir(
    path.resolve(__dirname, `../src/components/${params.name}`),
    (err: any) => {
      if (err) {
        console.error(err);
        return;
      }
    }
  );

  fs.writeFileSync(
    path.resolve(__dirname, `../src/components/${params.name}/index.tsx`),
    templateComponent
  );

  const importTemplate = `const ${params.name} = lazy(() =>
  import('../${params.name}').then((module) => ({
    default: module.${params.name},
 }))
);`;

  const routeTemplate = `<Route path='/${params.name}' component={${params.name}} />`;
  let fileContents = fs.readFileSync(
    path.resolve(__dirname, `../src/components/Routes/Routes.tsx`),
    'utf8'
  );

  fs.writeFileSync(
    path.resolve(__dirname, `../src/components/Routes/Routes.tsx`),
    fileContents.replace(
      /export const Routes = \(\) => {/,
      `${importTemplate}
export const Routes = () => {`
    )
  );

  fileContents = fs.readFileSync(
    path.resolve(__dirname, `../src/components/Routes/Routes.tsx`),
    'utf8'
  );

  fs.writeFileSync(
    path.resolve(__dirname, `../src/components/Routes/Routes.tsx`),
    fileContents.replace(
      /<Route render={/,
      `${routeTemplate}
      <Route render={`
    )
  );
  const utillist = fs.readFileSync(
    path.resolve(__dirname, `../src/pages/Utils/util-list.tsx`),
    'utf8'
  );
  fs.writeFileSync(
    path.resolve(__dirname, `../src/pages/Utils/util-list.tsx`),
    utillist.replace(
      /\/\/ end of list/,
      `{
    name:\'${params.name}\',
    icon: FileUnknownOutlined,
    path:\'${params.name}\',
  },
  // end of list`
    )
  );
  console.log(`Completed adding feature!
    If the app is already running you might need to refresh the component ${params.name}/index.tsx
  `);
}

function getArgsAndValue(params: string): { [x: string]: string } {
  const keyValue = params.split(':');
  return { [keyValue[0]]: keyValue[1] };
}

function validateRequiredParams(
  required: string[],
  params: string[],
  helpText = ''
) {
  const missingParams = required.filter((param) => !params.includes(param));
  if (missingParams.length) {
    console.log(
      `Missing required parameters: ${missingParams.join(', ')} \n`,
      helpText
    );
    return false;
  }
  return true;
}
