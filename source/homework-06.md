
# Homework 6 — Nyquist stability, control margins, and time delay

**Source:** AE511_HW6.pdf (2 pages). Unlike assignments that only cite a textbook, this PDF **includes photographs of the full statements and diagrams for Problems 1–2**; they have been interpreted and solved here without reproducing the photographs.

## Problem 1 — Feedback system with positive or negative gain

The block diagram has forward $K/(s^2+2s+2)$ and feedback sensor $H=1/(s+1)$, with a negative summing junction. Thus

$$L(s)=\frac{K}{(s^2+2s+2)(s+1)}.$$

Open-loop poles are $-1$ and $-1\pm j$, so the Nyquist criterion begins with $P=0$ open-loop right-half-plane poles. The closed-loop characteristic polynomial is

$$1+L(s)=0\quad\Longrightarrow\quad (s^2+2s+2)(s+1)+K=0,$$
$$\boxed{s^3+3s^2+4s+(2+K)=0.}$$

Use a cubic Routh table: the first column is $[1,\,3,\,(3\cdot4-(2+K))/3,\,2+K]$. All entries must be positive:

$$2+K>0,\qquad10-K>0\quad\Longrightarrow\quad\boxed{-2<K<10.}$$

At $K=-2$ a closed-loop pole reaches $s=0$ (marginal). At $K=10$ the Routh middle condition vanishes; the polynomial factors $(s+3)(s^2+4)$, so poles are $\pm2j$ (marginal). Outside the interval the closed loop is unstable. This analytic result is the exact gain range that a correctly interpreted Nyquist plot must reproduce, **including negative $K$**.

![Nyquist curves for representative gains](figures/hw06-nyquist.svg)

## Problem 2 — Magnetic-tape-drive speed controller

The printed model gives motor time constant $\tau_1=1$ s, sensor time constant $\tau_m=0.5$ s, and mechanical time constant $J/b=4$ s with $b=1$ N·m·s (hence $J=4$). The forward plant is

$$G(s)=\frac{K}{(s+1)(4s+1)},\quad H(s)=\frac1{0.5s+1},\quad L(s)=\frac{K}{(s+1)(4s+1)(0.5s+1)}.$$

For a unit step command, the measured speed is $Hy$ and $H(0)=1$. The steady-state fractional speed error is $e_\infty=1/(1+K)$. To obtain less than 7%,

$$\frac1{1+K}<0.07\quad\Rightarrow\quad \boxed{K>\frac1{0.07}-1\approx13.286.}$$

For $K\approx13.286$, solve $|L(j\omega)|=1$ using

$$|L(j\omega)|=\frac{K}{\sqrt{(1+\omega^2)(1+16\omega^2)(1+0.25\omega^2)}}.$$

The gain crossover is $\omega_c\approx1.477$ rad/s. Its phase is

$$\phi(\omega_c)=-\tan^{-1}\omega_c-\tan^{-1}(4\omega_c)-\tan^{-1}(0.5\omega_c)\approx-172.7^\circ,$$

so the **phase margin is only about $7.3^\circ$**. At phase crossover $\omega_\pi\approx1.658$ rad/s, the gain margin is about $1.27$ in linear units or **$2.1$ dB**. These are extremely small margins: the controller meets the DC tracking condition but is not a robust design. Choosing a larger $K$ for smaller error makes stability worse, not better.

![Tape-drive Bode and stability margins](figures/hw06-tape.svg)

## Problem 3 — Read margins from Bode, Nyquist, and Nichols

The supplied page has three views of the **same nontrivial loop**, with phase that reverses direction and may cross $-180^\circ$ more than once. For Bode, find each frequency at which magnitude crosses 0 dB and read its phase: $PM=180^\circ+\angle L(j\omega_c)$, with phase consistently unwrapped. Then find **every** frequency at phase $-180^\circ$ and calculate $GM_{\rm dB}=-20\log_{10}|L(j\omega_\pi)|$. A positive $PM$ at one crossover does not guarantee stability when there are multiple crossings or open-loop unstable poles.

For Nyquist, read the distance/angle to $(-1,0)$ on the **positive-frequency branch**, as the source instructs; for Nichols, measure the crossing at phase $-180^\circ$ and the phase distances at 0 dB. From the uploaded figure, a reasonable **graphical estimate** is gain crossover around $30$–$40$ rad/s and a positive phase margin of approximately $45$–$50^\circ$. There are **two** phase-$-180^\circ$ crossings: one has loop gain above 0 dB (about $+10$ to $+15$ dB), and the other is below 0 dB (about $-10$ to $-15$ dB). This suggests approximate allowable gain **decrease** and **increase** margins on the order of 10–15 dB, respectively, if the complete Nyquist winding verifies the current operating point is stable. They are **estimates**, not accurate numbers derivable from the small print; check the underlying numerical data or MATLAB's `allmargin` for exact results.

![Approximate stability-margin annotations interpreted from the supplied figure](figures/hw06-margins-annotated.svg)

The recreated sketch is an approximate teaching annotation, **not a numerical digitization** of the printed curves. The three plots encode the same gain and phase information, and multiple crossings must not be collapsed into a single margin.

## Problem 4 — Is a 25-ms delay important for a 1-s rise time?

A pure transport delay $e^{-s\tau}$ leaves magnitude unchanged and contributes phase $-\omega\tau$ radians. At gain crossover, phase-margin reduction is

$$\boxed{\Delta PM[\text{degrees}]=\omega_c\tau\frac{180}{\pi}.}$$

For an approximately first-order rise-time relation $t_r\approx1.8/\omega_c$, a one-second rise suggests $\omega_c\approx1.8$ rad/s. With $\tau=0.025$ s,

$$\Delta PM\approx1.8\cdot0.025\frac{180}{\pi}=2.58^\circ<5^\circ.$$

**Conclusion:** not a cause for concern under the stated rule of thumb. The exact answer is conditional: if actual crossover exceeds $5\pi/(180\tau)\approx3.49$ rad/s, the same delay would cost more than $5^\circ$ and become a concern.
