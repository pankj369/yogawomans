import { motion } from "framer-motion";

export default function PalmistryStatsRow() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full mt-16 md:mt-24 rounded-2xl md:rounded-[40px] border border-[#1E7A46]/30 bg-[#0A0A0A]/60 backdrop-blur-md p-6 md:p-12 flex flex-col xl:flex-row items-center justify-between gap-10"
    >
      
      {/* Quote Block */}
      <div className="flex items-center gap-6 max-w-xl">
        <div className="w-16 h-16 rounded-full border-2 border-[#D4A64F] flex items-center justify-center shrink-0 text-[#D4A64F] shadow-[0_0_15px_rgba(212,166,79,0.2)]">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
             <path d="M12 22C12 22 4 16 4 10C4 5.5 8 2 12 2C16 2 20 5.5 20 10C20 16 12 22 12 22Z" />
             <path d="M12 22V10" />
             <path d="M12 10C12 10 8 12 4 10" />
             <path d="M12 10C12 10 16 12 20 10" />
          </svg>
        </div>
        <p className="text-[#F7F3EC] text-base md:text-lg leading-relaxed">
          Palmistry is not about predicting the future, it's about understanding the present to <span className="text-[#D4A64F] font-medium">create a better tomorrow.</span>
        </p>
      </div>

      {/* Stats Divider (Desktop only) */}
      <div className="hidden xl:block w-[1px] h-20 bg-[#1E7A46]/30" />

      {/* Stats Block */}
      <div className="flex flex-wrap md:flex-nowrap justify-between w-full xl:w-auto gap-8 md:gap-16">
        
        {/* Stat 1 */}
        <div className="flex items-center gap-4">
          <div className="text-[#00E676]">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div>
            <h3 className="text-3xl font-serif text-[#F7F3EC] mb-1">50K+</h3>
            <p className="text-[#888] text-xs uppercase tracking-wider">Readings Completed</p>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="flex items-center gap-4">
          <div className="text-[#D4A64F]">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="7" />
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
            </svg>
          </div>
          <div>
            <h3 className="text-3xl font-serif text-[#F7F3EC] mb-1">98%</h3>
            <p className="text-[#888] text-xs uppercase tracking-wider">Accuracy Rate</p>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="flex items-center gap-4">
          <div className="text-[#E9781F]">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <div>
            <h3 className="text-3xl font-serif text-[#F7F3EC] mb-1">100%</h3>
            <p className="text-[#888] text-xs uppercase tracking-wider">User Satisfaction</p>
          </div>
        </div>

      </div>

    </motion.div>
  );
}
