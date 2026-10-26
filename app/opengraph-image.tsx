import { ImageResponse } from 'next/og'

export const alt = 'Traflinq — The Intelligence Layer for Managed Mobility'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 96px',
          background: 'linear-gradient(135deg, #080b14 0%, #11162a 100%)',
          color: '#ffffff',
        }}
      >
        <div style={{ display: 'flex', fontSize: 34, fontWeight: 700, color: '#fe8503', letterSpacing: 2 }}>TRAFLINQ</div>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 28, fontSize: 80, fontWeight: 800, lineHeight: 1.05 }}>
          <span>One Platform.</span>
          <span style={{ color: '#fe8503' }}>Every Employee Moves.</span>
        </div>
        <div style={{ display: 'flex', marginTop: 36, fontSize: 30, color: 'rgba(255,255,255,0.6)' }}>
          Employee transport &amp; corporate travel, orchestrated.
        </div>
      </div>
    ),
    size,
  )
}
