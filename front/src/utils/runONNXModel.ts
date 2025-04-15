import {InferenceSession, Tensor} from 'onnxruntime-web';

export async function runONNXModel(_inputs: number[], modelPath: string): Promise<number> {
    // let inputs = [0, 0.16, 0.26, 0.109, 0.5, 0.4844, 0.16, 0.12, 0.44, 0.11, 0.69, 0.27, 0.61]
    let inputs = [1.00000e+00, 2.11400e+00, 1.48600e+01, 9.64008e+03, 6.00000e+00,
        4.37500e+02, 9.00000e+00, 1.00000e+01, 5.20000e+01, 9.46000e+01,
        1.10000e+02, 4.00000e+01, 6.30000e+01]
    // let inputs = [0, 0.16, 0.26, 0.109]
    
    const session = await InferenceSession.create(modelPath);
    const inputTensor = new Tensor("float32", new Float32Array(inputs), [1, inputs.length]);
    const feeds: { [name: string]: any } = {};
    feeds["float_input"] = inputTensor;
    let outputTensor = await session.run(feeds);
    // debugger
    return outputTensor['output_label'].data[0] as number
}

