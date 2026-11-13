
# Homework 7 — Turn specifications into loop-shaping constraints

**Source:** AE511_HW7.pdf (4 pages). This assignment is about selecting appropriate $L$, $S=1/(1+L)$ and $T=L/(1+L)$, not blindly choosing controller gains.

## Problem 1.1 — Bandwidth, low-frequency disturbance rejection, and high-frequency noise

The required closed-loop bandwidth is 15 Hz, corresponding to $\omega_B=2\pi(15)\approx94.25$ rad/s. Gain crossover $\omega_c$ is often in the vicinity of $\omega_B$ but **is not guaranteed equal to it**; a precise choice depends on loop shape. A low-overshoot target motivates a substantial phase margin, e.g. **$PM\ge60^\circ$**, and a conventional margin target such as **$GM\ge8$ dB** (design choices, not values written into the problem).

For output disturbances below 5 Hz ($\omega<31.42$ rad/s), require $|S(j\omega)|\le0.1$, i.e. $|1+L(j\omega)|\ge10$. The conservative sufficient magnitude condition $|L|\ge11$ follows from the reverse triangle inequality $|1+L|\ge|L|-1$. For noise above 30 Hz ($\omega>188.50$ rad/s), require $|T|\le0.1$; $|L|\le1/11$ is a conservative sufficient condition since $|1+L|\ge1-|L|$. These bounds prescribe **high low-frequency loop gain**, a crossover region near the target bandwidth, and **small high-frequency loop gain**.

## Problem 1.2 — Suppress an 8-Hz structural mode without affecting rigid body dynamics

Treat the vibration as an **output disturbance** at $\omega_f=2\pi\cdot8\approx50.27$ rad/s. A factor-of-ten reduction means $|S(j\omega_f)|\le0.1$, or $|1+L(j\omega_f)|\ge10$. To avoid affecting the low-frequency rigid-body response, require $|T(j\omega)|$ small in the designated lower-frequency range, which in turn requires $|L|$ small there. This is *not* compatible with a simple monotonically decreasing high-gain loop from DC. The design needs a **band-limited resonant/modal control loop** with elevated gain near 8 Hz, small gain below the mode, and adequate phase margin around the local crossover(s).

A modal controller may use a band-pass filter and phase compensation around the structural mode. Check stability using the **full Nyquist contour**, as there may be multiple gain crossovers; choosing a single phase margin is not enough.

## Problem 1.3 — Pitch control, overshoot, rise time, and no gust degradation

Less than 20% overshoot corresponds to an approximate second-order damping lower bound from

$$M_p=e^{-\pi\zeta/\sqrt{1-\zeta^2}},\qquad \zeta\gtrsim0.456.$$

A two-second rise suggests a crossover of order $\omega_c\sim0.9$ rad/s under the common $t_r\approx1.8/\omega_c$ approximation. Choose a healthier $PM$ of roughly $60^\circ$ and $GM\ge8$ dB; make $|L(0)|$ large, or include integral action, to reduce steady-state error.

“No disturbance degradation at any frequency” is a stringent condition $|S(j\omega)|\le1$ for all $\omega$, equivalent to $|1+L(j\omega)|\ge1$ everywhere. **It may be impossible for nontrivial causal stable loop shapes** because sensitivity peaks are constrained by Bode-integral/waterbed tradeoffs under common assumptions. State that feasibility depends on plant constraints and offer a weighted bound (e.g. $M_s\le1.5$) when permitted rather than silently asserting an impossible perfect suppression.

## Problem 2 — Improve low-frequency disturbance rejection with a Nichols loop shape

The nominal Nichols diagram is supplied visually. To reduce output disturbances below the stipulated $1$-rad/s crossover, increase $|L|$ at low frequencies so $|S|=1/|1+L|$ falls. A **lag network** is a natural element because it can add relative low-frequency gain while leaving crossover approximately where it was. For example,

$$C_{\rm lag}(s)=\frac{1+s/0.1}{1+s/0.02},$$

has $C(0)=1$ and $C(j\omega)\approx0.2$ at frequencies far above the two breakpoints. To actually **raise** low-frequency gain while preserving the crossover magnitude, use the rescaled network $5C_{\rm lag}$, i.e.

$$\boxed{C(s)=5\frac{1+s/0.1}{1+s/0.02}},$$

which tends to gain 5 at DC and gain 1 near $\omega\gg0.1$. Check its phase dip below crossover; small additional phase can harm margin if the break frequencies are placed too close to 1 rad/s. The specific numbers are an **illustrative valid proposal**, not the only possible answer.

## Problem 3 — Estimate a dynamical system from a noisy step response

From the source plot: a step of **4** occurs at $t=1$ s; the output settles near $0.16$ and peaks around $0.20$–$0.205$ at roughly $1.6$–$1.8$ s. Thus the DC gain is about $K=0.16/4=0.04$. The overshoot estimate is $(0.203-0.16)/0.16\approx0.27$, giving damping $\zeta\approx0.39$. With peak time after the step $t_p\approx0.7$ s, $\omega_d\approx\pi/0.7=4.49$ rad/s and $\omega_n\approx4.88$ rad/s. A *rough* fitted model is

$$\boxed{G_{\rm est}(s)\approx\frac{0.04(4.88)^2}{s^2+2(0.39)(4.88)s+(4.88)^2}\approx\frac{0.95}{s^2+3.81s+23.8}.}$$

These are estimates read from a noisy figure, **not unique system identification**. For the new design, a two-second rise suggests crossover around $0.9$ rad/s, less than 5% overshoot suggests $\zeta\gtrsim0.69$ or a generous margin such as $PM\gtrsim65^\circ$, and **zero step steady-state error** requires an integrator (Type 1 stable loop). A PI or PI-plus-lead controller is a reasonable structure; choose its gains/zeros by tuning the *estimated* plant and validating full closed-loop poles and transient performance. There is no unique numerical controller without additional design constraints.

## Problem 4 — Nyquist right-half-plane pole counting

Define $P$ as open-loop RHP poles, $Z$ as closed-loop RHP poles, and $N_{\rm CW}$ as signed **clockwise** encirclements of $-1$ by the full Nyquist contour. Under this stated convention,

$$\boxed{Z=P+N_{\rm CW}}\quad\text{(clockwise positive; use the appropriate full contour).}$$

A plot with two **counterclockwise** encirclements has $N_{\rm CW}=-2$, so $Z=P-2$. The question supplies no $P$, so it does **not** determine a unique nonnegative value of $Z$; for example $P=2\Rightarrow Z=0$, whereas $P=3\Rightarrow Z=1$. This missing assumption is important.

For the first supplied diagram, the Nyquist trace remains to the right of approximately $-0.6$ and never encloses $-1$; if the closed loop is stable then $Z=0$ and $P=0$. In the **second** diagram, the critical point $-1$ lies inside both the large outer trace and the small center loop. Follow the arrows: the large outer traversal is clockwise (upper branch toward the right; lower branch toward the left), and the inner traversal around $-1$ is clockwise as well. Their signed winding numbers add, so $N_{\rm CW}=+2$. Since the problem explicitly states $P=1$, the closed-loop RHP count is **$\boxed{Z=P+N_{\rm CW}=1+2=3}$**. This is an example where just saying “the point lies inside the curve” would undercount the winding due to the small nested loop. Note that the Nyquist sign convention must be stated to make the conclusion unambiguous.
