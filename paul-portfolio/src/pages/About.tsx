import { Seo } from '../components/Seo'
import { PageHeader } from '../components/ui/PageHeader'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { Timeline } from '../components/ui/Timeline'
import { CaseStudySection } from '../components/case-study/CaseStudySection'
import { aboutSections } from '../data/about'
import { education, experience } from '../data/experience'
import { siteConfig } from '../config/site'

export default function About() {
  return (
    <>
      <Seo
        title="About"
        path="/about"
        description="Paul Mfonobong Victor is a software developer in Lagos growing from frontend into full-stack, real-time and cloud engineering."
      />
      <PageHeader
        title="About me"
        intro="A software developer in Lagos, building from frontend towards full-stack engineering."
      />

      <div className="container-page pb-8 pt-4">
        {aboutSections.map((s) => (
          <Reveal key={s.title}>
            <CaseStudySection id={s.title.toLowerCase().replace(/[^a-z]+/g, '-')} title={s.title}>
              {s.body.map((para) => (
                <p key={para} className="max-w-2xl text-lg">
                  {para}
                </p>
              ))}
            </CaseStudySection>
          </Reveal>
        ))}

        <CaseStudySection id="timeline" title="Learning and work">
          <div className="space-y-12">
            <div>
              <h3 className="mb-6 text-2xl">Education</h3>
              <Timeline entries={education} label="Education" />
            </div>
            <div>
              <h3 className="mb-6 text-2xl">Experience</h3>
              <Timeline entries={experience} label="Experience" />
            </div>
            <div className="flex flex-wrap gap-3">
              <Button to="/experience" variant="secondary">
                Full experience page
              </Button>
              {siteConfig.resumePath && (
                <Button href={siteConfig.resumePath} download variant="ghost">
                  Download résumé
                </Button>
              )}
            </div>
          </div>
        </CaseStudySection>
      </div>
    </>
  )
}
