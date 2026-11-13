
# Homework 5 — Frequency-domain clues about time response

**Source:** AE511_HW5.pdf (2 pages). Problem 1 is specified and solved; Problems 2–5 are textbook references with no supplied problem statement.

## Problem 1(a) — Adding a real zero to a resonant second-order plant

The assigned family is

$$G_z(s;a)=\frac{s+a}{a}\cdot\frac{25}{s^2+3s+25},\qquad a\in\{1,10,100\}.$$

The second-order poles remain fixed at $-1.5\pm j4.770$ ($\zeta=0.3,\omega_n=5$). The new zero is at $-a$, with a DC-normalized factor $1+s/a$. Its magnitude and phase are

$$\left|1+\frac{j\omega}{a}\right|=\sqrt{1+(\omega/a)^2},\quad\arg(1+j\omega/a)=\tan^{-1}(\omega/a).$$

For $a=100$, the zero is far beyond the $5$-rad/s dynamics; the system behaves nearly like the original underdamped second order. At $a=10$, the zero modestly emphasizes higher frequencies and sharpens the leading edge. At $a=1$, the zero acts well before resonance and significantly increases mid/high-frequency gain; the step rises faster and can overshoot more. **A left-half-plane zero need not make the closed-loop step more damped**: it can make the transient more aggressive by altering residues and initial slope.

The final values are all $G_z(0)=1$, so differences are purely transient, not DC tracking changes.

![Bode and step responses for varying real zeros](figures/hw05-zero.svg)

## Problem 1(b) — Adding a real pole instead

The second family is

$$G_p(s;a)=\frac{a}{s+a}\cdot\frac{25}{s^2+3s+25}.$$

The added pole factor has magnitude $1/\sqrt{1+(\omega/a)^2}$ and phase $-\tan^{-1}(\omega/a)$. At $a=100$, it has little effect around $\omega_n=5$; at $a=10$, it adds noticeable rolloff and phase lag; at $a=1$, it suppresses much of the resonant bandwidth and slows the initial response substantially. The DC gain remains 1.

The comparison teaches two distinct facts: (1) **a smaller bandwidth usually corresponds to a slower rise** when other features remain similar; (2) resonance and overshoot are influenced by poles, zeros, and excitation residues, not bandwidth alone. Compare the phase as well as the magnitude when making causal claims.

![Bode and step responses for varying real poles](figures/hw05-pole.svg)

## Problems 2–5 — Textbook Problems 4.1, 4.4, 4.7, and 4.8

Only the problem numbers are printed in the uploaded homework. The textbook questions and any diagrams/data are unavailable, so **specific answers cannot be recovered**. Use the following transferable checklist when those pages are supplied: factor each transfer function into gain, integrators, real poles/zeros, and second-order factors; calculate break frequencies, slopes, corner magnitudes, phase contributions, crossover(s), and Nyquist encirclements; compare the predicted transient behavior with the exact simulation. A guessed statement would be less useful than this honest boundary.
