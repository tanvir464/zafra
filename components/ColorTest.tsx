export default function ColorTest() {
  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Custom Colors Test</h2>
      
      {/* Theme Colors */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Theme Colors</h3>
        <div className="flex flex-wrap gap-2">
          <div className="w-20 h-20 bg-theme-900 rounded-lg flex items-center justify-center text-white text-xs">theme-900</div>
          <div className="w-20 h-20 bg-theme-500 rounded-lg flex items-center justify-center text-white text-xs">theme-500</div>
          <div className="w-20 h-20 bg-theme-100 rounded-lg flex items-center justify-center text-theme-900 text-xs">theme-100</div>
        </div>
      </div>

      {/* Primary Colors */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Primary Colors</h3>
        <div className="flex flex-wrap gap-2">
          <div className="w-20 h-20 bg-primary-500 rounded-lg flex items-center justify-center text-white text-xs">primary-500</div>
          <div className="w-20 h-20 bg-primary-900 rounded-lg flex items-center justify-center text-white text-xs">primary-900</div>
          <div className="w-20 h-20 bg-primary-100 rounded-lg flex items-center justify-center text-primary-900 text-xs">primary-100</div>
        </div>
      </div>

      {/* Gold Colors */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Gold Colors</h3>
        <div className="flex flex-wrap gap-2">
          <div className="w-20 h-20 bg-gold-500 rounded-lg flex items-center justify-center text-white text-xs">gold-500</div>
          <div className="w-20 h-20 bg-gold-400 rounded-lg flex items-center justify-center text-white text-xs">gold-400</div>
          <div className="w-20 h-20 bg-gold-100 rounded-lg flex items-center justify-center text-gold-900 text-xs">gold-100</div>
        </div>
      </div>

      {/* Rose Colors */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Rose Colors</h3>
        <div className="flex flex-wrap gap-2">
          <div className="w-20 h-20 bg-rose-500 rounded-lg flex items-center justify-center text-white text-xs">rose-500</div>
          <div className="w-20 h-20 bg-rose-400 rounded-lg flex items-center justify-center text-white text-xs">rose-400</div>
          <div className="w-20 h-20 bg-rose-100 rounded-lg flex items-center justify-center text-rose-900 text-xs">rose-100</div>
        </div>
      </div>

      {/* Success/Error Colors */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Status Colors</h3>
        <div className="flex flex-wrap gap-2">
          <div className="w-20 h-20 bg-success-500 rounded-lg flex items-center justify-center text-white text-xs">success</div>
          <div className="w-20 h-20 bg-error-500 rounded-lg flex items-center justify-center text-white text-xs">error</div>
          <div className="w-20 h-20 bg-warning-500 rounded-lg flex items-center justify-center text-white text-xs">warning</div>
        </div>
      </div>
    </div>
  )
} 