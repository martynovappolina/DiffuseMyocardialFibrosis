import { InferenceSession, Tensor } from 'onnxjs'

export async function runONNXModel(tensor: number[], model_path: string): Promise<number> {
    const session = new InferenceSession()
    await session.loadModel(model_path)
    const inputs = [new Tensor(tensor, "float32", [1, 7])]
    const outputMap = await session.run(inputs)
    const outputTensor = outputMap.values().next()?.value
    
    if (outputTensor === undefined) {
        throw new Error('outputTensor is undefined')
    }
    
    return (outputTensor.data[1] as number)*100
}

