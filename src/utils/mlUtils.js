import * as tf from '@tensorflow/tfjs';

export const trainLinearRegressionModel = async (data) => {
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });

  const xs = tf.tensor2d(data.map(d => [d.time]), [data.length, 1]);
  const ys = tf.tensor2d(data.map(d => [d.demand]), [data.length, 1]);

  await model.fit(xs, ys, { epochs: 100 });

  return model;
};

export const predictDemand = (model, time) => {
  const prediction = model.predict(tf.tensor2d([[time]], [1, 1]));
  return prediction.dataSync()[0];
};