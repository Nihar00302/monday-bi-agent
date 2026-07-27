import { motion } from 'framer-motion'
import { Bot, SendHorizontal, Sparkles, UserRound } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatBoxProps {
  messages: Message[]
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  isLoading: boolean
  quickQuestions: string[]
  onSelectQuickQuestion: (question: string) => void
}

export function ChatBox({
  messages,
  value,
  onChange,
  onSubmit,
  isLoading,
  quickQuestions,
  onSelectQuickQuestion,
}: ChatBoxProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.95)]"
      >
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-violet-400/20 bg-violet-500/10 p-2 text-violet-200">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">AI Business Analyst</h3>
            <p className="text-sm text-slate-400">Ask anything about pipeline health, deals, and opportunities.</p>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${message.role === 'user' ? 'bg-violet-500/20 text-violet-100' : 'border border-white/10 bg-slate-950/60 text-slate-200'}`}>
                <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-slate-400">
                  {message.role === 'user' ? <UserRound className="h-3.5 w-3.5" /> : <Sparkles className="h-3.5 w-3.5" />}
                  {message.role === 'user' ? 'You' : 'Analyst'}
                </div>
                <p className="whitespace-pre-wrap text-sm leading-6">{message.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-violet-400" />
                  <span>Summarizing the latest signal set…</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-3xl border border-white/10 bg-slate-900/70 p-5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.95)]"
      >
        <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
          <Sparkles className="h-4 w-4 text-violet-300" />
          Suggested prompts
        </div>
        <div className="mt-4 space-y-2">
          {quickQuestions.map((question) => (
            <button
              key={question}
              type="button"
              onClick={() => onSelectQuickQuestion(question)}
              className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-3 py-3 text-left text-sm text-slate-300 transition hover:border-violet-400/40 hover:bg-violet-500/10"
            >
              {question}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-violet-400/10 bg-violet-500/10 p-4">
          <label className="text-sm font-medium text-slate-200" htmlFor="chat-input">
            Ask your question
          </label>
          <textarea
            id="chat-input"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault()
                onSubmit()
              }
            }}
            rows={6}
            className="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950/70 px-3 py-3 text-sm text-white outline-none ring-0 placeholder:text-slate-500"
            placeholder="Ask about deal risk, executive summary, or next actions..."
          />
          <button
            type="button"
            onClick={onSubmit}
            disabled={isLoading || !value.trim()}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-violet-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <SendHorizontal className="h-4 w-4" />
            {isLoading ? 'Thinking…' : 'Send'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
