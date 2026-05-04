import type { MoodleCourse, MoodleUser, MoodleUserGrade, IMoodleService } from '../../shared/types'

const DEFAULT_BASE_URL = 'https://www3.gobiernodecanarias.org/medusa/eforma/campus'

export class MoodleService implements IMoodleService {
  constructor(
    private readonly token: string,
    private readonly userId: number,
    private readonly baseUrl: string = DEFAULT_BASE_URL
  ) {}

  private async call<T>(wsfunction: string, params: Record<string, unknown> = {}): Promise<T> {
    const url = new URL(`${this.baseUrl}/webservice/rest/server.php`)
    url.searchParams.set('wstoken', this.token)
    url.searchParams.set('wsfunction', wsfunction)
    url.searchParams.set('moodlewsrestformat', 'json')
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, String(value))
    }

    const response = await fetch(url.toString())
    if (!response.ok) throw new Error(`Moodle API error: ${response.statusText}`)

    const data = await response.json()
    if (data?.exception) throw new Error(`Moodle: ${data.message}`)

    return data as T
  }

  getCourses(): Promise<MoodleCourse[]> {
    return this.call('core_enrol_get_users_courses', { userid: this.userId })
  }

  getEnrolledUsers(courseId: number): Promise<MoodleUser[]> {
    return this.call('core_enrol_get_enrolled_users', { courseid: courseId })
  }

  getAssignments(courseId: number): Promise<unknown> {
    return this.call('mod_assign_get_assignments', { 'courseids[0]': courseId })
  }

  async getGradebook(courseId: number): Promise<MoodleUserGrade[]> {
    const res = await this.call<{ usergrades: MoodleUserGrade[] }>(
      'gradereport_user_get_grade_items',
      { courseid: courseId }
    )
    return res.usergrades
  }
}
