// Landing page component (React)
import logo from '../../assets/NP_Logo2.png';
import wordLogo from '../../assets/NP_WOrds.png';
import { motion } from 'motion/react';

const COLORS = {
  primary: '#543AF8',
  secondaryBg: '#EFF6FF',
  textDark: '#141414',
  textMuted: '#1A1C1E',
  homeIndicator: '#141414',
};

function StatusBar() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 44,
        padding: '12px 18px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: 12,
        color: COLORS.textDark,
      }}
    >
      <div>9:41</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 1.5 }}>
          {[4, 6, 8, 10].map((h) => (
            <div
              key={h}
              style={{
                width: 2,
                height: h,
                borderRadius: 1,
                backgroundColor: COLORS.textDark,
              }}
            />
          ))}
        </div>
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            border: `2px solid ${COLORS.textDark}`,
            borderTop: 'none',
            borderLeft: 'none',
            transform: 'rotate(45deg)',
            boxSizing: 'border-box',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <div
            style={{
              width: 18,
              height: 10,
              borderRadius: 3,
              border: `1.5px solid ${COLORS.textDark}`,
              padding: 1.5,
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 2,
                backgroundColor: COLORS.textDark,
              }}
            />
          </div>
          <div
            style={{
              width: 2,
              height: 6,
              borderRadius: 1,
              backgroundColor: COLORS.textDark,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function LandingScreen({ onSignIn, onRegister }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
        backgroundColor: '#FFFFFF',
        position: 'relative',
        fontFamily:
          "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
        color: COLORS.textDark,
        overflow: 'hidden',
        flex: 1,
      }}
    >

      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: 120,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <motion.img
          src={logo}
          alt="NovaPay logo"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{
            width: 230,
            height: 200,
            objectFit: 'contain',
          }}
        />
        <motion.img
          src={wordLogo}
          alt="NovaPay text"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{
            width: 240,
            marginTop: 0,
            objectFit: 'contain',
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.35, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 64,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <div
          style={{
            display: 'flex',
            width: 280,
            height: 52,
            borderRadius: 14,
            backgroundColor: COLORS.secondaryBg,
            padding: 4,
            boxSizing: 'border-box',
          }}
        >
          <button
            type="button"
            data-testid="btnCreateAccount"
            onClick={onRegister}
            style={{
              flex: 1,
              border: 'none',
              borderRadius: 14,
              backgroundColor: COLORS.primary,
              color: '#FFFFFF',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Register
          </button>
          <button
            type="button"
            data-testid="btnSignIn"
            onClick={onSignIn}
            style={{
              flex: 1,
              border: 'none',
              borderRadius: 14,
              backgroundColor: COLORS.secondaryBg,
              color: COLORS.primary,
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Sign In
          </button>
        </div>

        <div
          style={{
            fontSize: 12,
            color: COLORS.textMuted,
          }}
        >
          Powered by Nium
        </div>
      </motion.div>

      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 'calc(8px + env(safe-area-inset-bottom))',
          transform: 'translateX(-50%)',
          width: 134,
          height: 5,
          borderRadius: 999,
          backgroundColor: COLORS.homeIndicator,
        }}
      />
    </div>
  );
}

export default LandingScreen;
