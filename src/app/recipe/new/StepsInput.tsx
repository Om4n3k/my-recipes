'use client'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { CgAdd, CgRemove } from 'react-icons/cg'
import { Label } from '@radix-ui/react-label'

const StepsInput = () => {
    const [steps, setSteps] = useState<string[]>([''])

    const handleStepChange = (index: number, value: string) => {
        const newSteps = [...steps]
        newSteps[index] = value
        setSteps(newSteps)
    }

    const addStep = () => setSteps([...steps, ''])
    const removeStep = (index: number) => setSteps(steps.filter((_, i) => i !== index))

    return (
        <div className="flex flex-col gap-2">
            <Label className="text-md">Steps</Label>
            {steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-2">
                    <Input
                        name={`steps[]`}
                        value={step}
                        onChange={e => handleStepChange(idx, e.target.value)}
                        placeholder={`Step ${idx + 1}`}
                        required
                    />
                    {steps.length > 1 && (
                        <Button type="button" variant='destructive' onClick={() => removeStep(idx)} size="icon">
                            <CgRemove />
                        </Button>
                    )}
                </div>
            ))}
            <Button type="button" onClick={addStep} size="sm">
                <CgAdd/> Add step
            </Button>
        </div>
    )
}

export default StepsInput