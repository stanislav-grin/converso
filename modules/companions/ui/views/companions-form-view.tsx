import { CompanionForm } from '@/modules/companions/ui/components/companion-form'

export const CompanionsFormView = () => {
  return (
    <article className="w-full gap-4 flex flex-col">
      <h1>Companion Builder</h1>

      <CompanionForm />
    </article>
  )
}