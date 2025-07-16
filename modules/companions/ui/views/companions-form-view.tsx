import { CompanionForm } from '@/modules/companions/ui/components/companion-form'

export const CompanionsFormView = () => {
  return (
    <main className="md:w-2/3 items-center justify-center">
      <article className="w-full gap-4 flex flex-col">
        <h1>Companion Builder</h1>

        <CompanionForm />
      </article>
    </main>
  )
}