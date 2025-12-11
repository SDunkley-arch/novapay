// Landing page component (React) - Redesigned with Novapay branding
import { motion } from 'motion/react';
import landingBg from '../../assets/landing-bg.png';
import heroIllustration from '../../assets/hero-illustration.png';

const COLORS = {
  accent: '#A45CFF',
  textDark: '#111111',
  textMuted: '#7A7A7A',
  white: '#FFFFFF',
  lavenderGlow: '#E7D9FF',
  lavenderLight: '#F5F0FF',
};


function LandingScreen({ onSignIn, onRegister }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
        backgroundColor: COLORS.white,
        position: 'relative',
        fontFamily:
          "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
        color: COLORS.textDark,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >


      {/* Hero background image */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${landingBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Logo area */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          position: 'relative',
          marginTop: 'max(24px, env(safe-area-inset-top, 24px))',
          marginLeft: 28,
          zIndex: 1,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <span
            style={{
              fontSize: 26,
              letterSpacing: '-0.5px',
              color: COLORS.textDark,
            }}
          >
            <span style={{ fontWeight: 300 }}>Nova</span>
            <span style={{ fontWeight: 600 }}>pay</span>
          </span>
          {/* Accent corner glyph */}
          <div
            style={{
              width: 6,
              height: 6,
              marginLeft: 2,
              marginTop: 2,
              borderTop: `2px solid ${COLORS.accent}`,
              borderRight: `2px solid ${COLORS.accent}`,
            }}
          />
        </div>
      </motion.div>

      {/* Hero illustration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '16px 20px',
          zIndex: 1,
        }}
      >
        <img
          src={heroIllustration}
          alt="Financial wellness illustration"
          style={{
            width: '85%',
            maxWidth: 320,
            height: 'auto',
            objectFit: 'contain',
          }}
        />
      </motion.div>

      {/* Main content area */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingLeft: 28,
          paddingRight: 28,
          zIndex: 1,
        }}
      >
        {/* Section tag */}
        <div
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: COLORS.accent,
            marginBottom: 16,
            textTransform: 'lowercase',
          }}
        >
          control your budget
        </div>

        {/* Main headline */}
        <h1
          style={{
            margin: 0,
            fontSize: 48,
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: '-1px',
          }}
        >
          <span style={{ color: COLORS.textDark }}>Your</span>
          <br />
          <span style={{ color: COLORS.textDark }}>Money</span>
          <br />
          <span style={{ color: COLORS.accent }}>Instantly.</span>
        </h1>

        {/* Supporting description */}
        <p
          style={{
            marginTop: 20,
            marginBottom: 0,
            fontSize: 15,
            fontWeight: 400,
            color: COLORS.textMuted,
            lineHeight: 1.5,
            maxWidth: 280,
          }}
        >
          Track the money you spend with friends & brands
        </p>
      </motion.div>

      {/* Frosted glass bottom panel */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        style={{
          position: 'relative',
          margin: '0 16px',
          marginBottom: 'max(24px, env(safe-area-inset-bottom, 24px))',
          zIndex: 2,
        }}
      >
        {/* Abstract blurred purple shapes behind the panel */}
        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: '20%',
            width: 100,
            height: 100,
            background: `radial-gradient(circle, ${COLORS.accent}30 0%, transparent 70%)`,
            filter: 'blur(30px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            right: '15%',
            width: 80,
            height: 80,
            background: `radial-gradient(circle, ${COLORS.lavenderGlow}50 0%, transparent 70%)`,
            filter: 'blur(25px)',
            pointerEvents: 'none',
          }}
        />

        {/* Frosted panel */}
        <div
          style={{
            position: 'relative',
            backgroundColor: 'rgba(255, 255, 255, 0.80)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: 30,
            padding: '28px 24px 24px',
            boxShadow: '0 18px 40px rgba(0, 0, 0, 0.12)',
            // Inner glow effect on top edge
            border: '1px solid rgba(255, 255, 255, 0.6)',
          }}
        >
          {/* Sign In button - centered pill */}
          <button
            type="button"
            data-testid="btnSignIn"
            onClick={onSignIn}
            style={{
              width: '100%',
              height: 56,
              border: 'none',
              borderRadius: 28,
              backgroundColor: COLORS.textDark,
              color: COLORS.white,
              fontSize: 16,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'inherit',
              transition: 'transform 0.15s ease, opacity 0.15s ease',
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.98)';
              e.currentTarget.style.opacity = '0.9';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.opacity = '1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.opacity = '1';
            }}
          >
            Sign In
          </button>

          {/* Bottom text */}
          <div
            style={{
              marginTop: 20,
              textAlign: 'center',
              fontSize: 14,
              color: COLORS.textMuted,
            }}
          >
            Don't have an account?{' '}
            <button
              type="button"
              data-testid="btnCreateAccount"
              onClick={onRegister}
              style={{
                background: 'none',
                border: 'none',
                color: COLORS.accent,
                fontSize: 14,
                fontWeight: 500,
                cursor: 'pointer',
                padding: 0,
                fontFamily: 'inherit',
              }}
            >
              Create one
            </button>
          </div>
        </div>
      </motion.div>


    </div>
  );
}

export default LandingScreen;
