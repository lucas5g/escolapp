import { describe, expect, it } from "vitest";
import { ModalityService } from "../services/ModalityService";

describe('Modality', () => {
  it('Modality list', async () => {
    const modalities = await ModalityService.findMany()
    expect(modalities.length).toBeGreaterThan(0)
    modalities.forEach(modality => {
      expect(modality).toHaveProperty('type')
    })
  })

  it('Modality show', async () => {
    const modality = await ModalityService.findById(1)
    expect(modality).toHaveProperty('membersQuantity')
  })

  it('Modality crud', async () => {

    const data = {
      name: 'teste',
      membersQuantity: 22,
      teamsQuantity: 2,
      type: 'collective'
    }
    /**
     * Create
     */
    const modality = await ModalityService.create(data)
    expect(modality).toHaveProperty('name', data.name)
    /**
     * Update
     */
    const modalityUpdate = await ModalityService.update(modality.id, { ...data, type:'individual', teamsQuantity: 9 })
    expect(modalityUpdate).contain({
      teamsQuantity: 9,
      type:'individual'
    })
    /**
     * Delete
     */
    await ModalityService.delete(modality.id)
  })

})