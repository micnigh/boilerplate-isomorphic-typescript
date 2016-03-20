// forked from gist - https://gist.github.com/zuk/4ac39e30381d77ade2e6
// copied from https://github.com/dotcs/normalizr/blob/963f9297ef5c97866bc3e6de5cdef730155a3e09/src/index.js
// ... waiting until this gets merged into normalizr
// see https://github.com/gaearon/normalizr/pull/20

import { isObject, clone } from "lodash";
let EntitySchema = require("normalizr").Schema;

function visitObjectForDenorm(obj, schema, bag) {
  let denormalized = {};
  let key = Object.keys(obj)[0];

  denormalized[key] = visitForDenorm(obj[key], schema[key], bag);

  return denormalized;
}

function visitArrayForDenorm(obj, arraySchema, bag) {
  let itemSchema = arraySchema.getItemSchema();
  let itemSchemaKey = itemSchema.getKey();
  let denormalized;

  let item = clone(bag[itemSchemaKey]);

  denormalized = [];
  obj.forEach(function(itemKey) {
    let keys;
    if (item.hasOwnProperty(itemSchemaKey)) {
      denormalized.push(visitForDenorm(item[itemKey], itemSchema[itemSchemaKey], bag));
    } else {
      keys = Object.keys(itemSchema);
      if (keys.length <= 2) {
        denormalized.push(visitForDenorm(item[itemKey], undefined));
      } else {
        denormalized.push(visitForDenorm(itemKey, itemSchema, bag));
      }
    }
  });

  return denormalized;
}

function visitEntityForDenorm(entity, entitySchema, bag) {
  let entityKey = entitySchema.getKey();
  let denormalized = clone(bag[entityKey][entity]);
  Object.keys(entitySchema).forEach(function(schemaKey) {
    if (schemaKey.indexOf("_") !== 0) {  // TODO: better way to access the relevant schema keys?
      if (typeof denormalized === "object" && denormalized.hasOwnProperty(schemaKey)) {
        denormalized[schemaKey] = visitForDenorm(denormalized[schemaKey], entitySchema[schemaKey], bag);
      }
    }
  });
  return denormalized;
}

function visitForDenorm(obj, schema, bag) {
  if (!isObject(schema)) {
    return obj;
  }

  if (schema instanceof EntitySchema) {
    return visitEntityForDenorm(obj, schema, bag);
  } else if (obj instanceof Array) { // hack because normalizr doesn"t export ArraySchema
    return visitArrayForDenorm(obj, schema, bag);
  } else {
    return visitObjectForDenorm(obj, schema, bag);
  }
}

export default function denormalize(obj, schema) {
  if (!isObject(obj) && !Array.isArray(obj)) {
    throw new Error("Denormalize accepts an object or an array as its input.");
  }

  if (!isObject(schema) || Array.isArray(schema)) {
    throw new Error("Normalize accepts an object for schema.");
  }

  let bag = obj.entities;
  let result = obj.result;
  let denormalized = visitForDenorm(result, schema, bag);

  return denormalized;
}
