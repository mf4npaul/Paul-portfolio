import { Download } from 'lucide-react'
import { Seo } from '../components/Seo'
import { PageHeader } from '../components/ui/PageHeader'
import { Button } from '../components/ui/Button'
import { Reveal } from '../components/ui/Reveal'
import { Timeline } from '../components/ui/Timeline'
import { CaseStudySection } from '../components/case-study/CaseStudySection'
import { education, experience } from '../data/experience'
import { siteConfig } from '../config/site'

export default function Experience() {
  return (
    <>
      <Seo
        title="Experience and education"
        path="/experience"
        description="Work experience and education of Paul Victor, including a NIIT Diploma in Software Engineering with DevOps."
      />
      <PageHeader
        title="Experience and education"
        intro="Where I have worked and studied."
      >
        {siteConfig.resumePath && (
          <div className="mt-8">
            <Button href={siteConfig.resumePath} download icon={<Download size={18} aria-hidden="true" />}>
              Download résumé
            </Button>
          </div>
        )}
      </PageHeader>

      <div className="container-page pb-8 pt-4">
        <Reveal>
          <CaseStudySection id="experience" title="Experience">
            <Timeline entries={experience} label="Experience" />
          </CaseStudySection>
        </Reveal>
        <Reveal>
          <CaseStudySection id="education" title="Education">
            <Timeline entries={education} label="Education" />
          </CaseStudySection>
        </Reveal>
      </div>
    </>
  )
}
