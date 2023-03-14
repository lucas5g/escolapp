import { describe, expect, it } from "vitest";
import { TeamService } from "../services/TeamService";

describe('Team', () => {
  it('Team list', async() => {
    const teams = await TeamService.findMany()
    expect(teams.length).toBeGreaterThanOrEqual(1)
  })

  it('Team show', async() => {
    const team = await TeamService.findById(1)
    console.log(team)
    expect(team).toHaveProperty('name')
  })

  // it.only('Team Crud')
})