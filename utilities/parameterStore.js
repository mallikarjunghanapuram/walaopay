"use strict";

const aws = require("aws-sdk");
const variables = require("../variables");

const ssm = new aws.SSM({
  apiVersion: "2014-11-06",
  region: variables.awsRegion
});

const getParameter = async name => {
  const params = {
    Name: name,
    WithDecryption: true
  };
  
  const parameter = await ssm.getParameter(params).promise();
  return parameter.Parameter.Value;
};

exports.getParameter = getParameter;
