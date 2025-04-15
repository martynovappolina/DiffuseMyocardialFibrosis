import {InferenceSession, Tensor} from 'onnxruntime-web';

export async function runONNXModel(inputs: number[] | { [key: string]: number }, modelPath: string): Promise<number> {
    const session = await InferenceSession.create(modelPath);
    
    let inputTensor: any;
    if (Array.isArray(inputs)) {
        inputTensor = new Tensor("float32", new Float32Array(inputs), [1, inputs.length]);
    } else {
        const inputValues = Object.values(inputs);
        inputTensor = new Tensor("float32", new Float32Array(inputValues), [1, inputValues.length]);
    }
    
    const feeds: { [name: string]: any } = {};
    feeds["float_input"] = inputTensor;
    let outputTensor = await session.run(feeds);
    
    return outputTensor['output_label'].data[0] as number;
}

