
# Homework 8 — Root locus, lead control, and tricky transient responses

**Source:** AE511_HW8.pdf (1 page). Questions 3–4 quote textbook problems not included in this upload; Problems 1–2 are worked directly.

## Problem 1 — Stabilize an unstable second-order plant

The plant is $G(s)=10/(s^2-1.5s+25)$. Its poles are $0.75\pm j\sqrt{25-0.75^2}$, in the **right half-plane**, so the uncontrolled plant is unstable.

With unity *negative* feedback and proportional gain $K$, the characteristic polynomial is $s^2-1.5s+25+10K$. Proportional gain changes only the constant term, leaving the $s$ coefficient **negative**. For a stable second-order polynomial with positive leading coefficient, the $s$ coefficient must be positive. Therefore **no real positive proportional gain can stabilize this plant** (and negative gain does not fix the negative damping term).

Now use the assigned lead controller $C(s)=K(s+5)/(s+50)$. The closed-loop characteristic polynomial is

$$(s+50)(s^2-1.5s+25)+10K(s+5)=0,$$
$$\boxed{s^3+48.5s^2+(10K-50)s+(1250+50K)=0.}$$

The Routh first-column conditions for a cubic $s^3+a_2s^2+a_1s+a_0$ are $a_2>0$, $a_1>0$, $a_0>0$, and $a_2a_1>a_0$. These produce

$$10K-50>0,\quad1250+50K>0,\quad 48.5(10K-50)>1250+50K.$$

The strongest constraint is

$$\boxed{K>\frac{3675}{435}\approx8.4483.}$$

This **does stabilize** the plant. A desired textbook second-order overshoot of 10% corresponds to $\zeta\approx0.591$. On the root locus, choose a complex pole near that damping line; for this system $K\approx65$ gives poles approximately $-6.73\pm j9.12$ (damping $\approx0.594$) and a third pole near $-35.0$.

**Critical learning point:** the actual closed-loop numerator is $10K(s+5)$, with a zero at $-5$. The second-order formula assumes no important numerator zeros and an adequately dominant pair. Here the zero substantially changes the transient; the **exact simulated step overshoot for $K=65$ is roughly 63%, not 10%**. This directly answers the assignment's request to explain a disagreement between the pole-damping estimate and observed overshoot. The given lead shape with a gain-only parameter does not guarantee the 10% transient goal.

![Closed-loop step responses for several stabilizing lead gains](figures/hw08-lead.svg)

## Problem 2.1 — Root locus for $G_1(s)=(s-2)/(s^2+10s+100)$

Poles are $-5\pm j\sqrt{75}=-5\pm j8.660$ and the zero is at $+2$. There are $n=2$ poles and $m=1$ zero, so one branch ends at the finite RHP zero and one goes to infinity. For **negative** feedback, the characteristic polynomial is

$$s^2+(10+K)s+(100-2K)=0.$$

Routh requires $10+K>0$ and $100-2K>0$. For $K\ge0$, stability holds for $0\le K<50$; at $K=50$ a pole reaches the origin and larger gains are unstable. For **positive** feedback, the polynomial becomes $s^2+(10-K)s+(100+2K)$. For $K\ge0$, stability requires $K<10$; at $K=10$ the damping term vanishes, causing imaginary-axis poles. These exact checks should match the two root-locus sketches.

![Positive and negative feedback root loci](figures/hw08-root1.svg)

## Problem 2.2 — Root locus for a four-pole / three-zero plant

The printed transfer function is

$$G_2(s)=\frac{(s+2)(s^2+5s+25)}{(s-1)(s+30)(s^2+10s+100)}.$$

There are four open-loop poles (including an unstable pole at $+1$), three finite zeros, and **one asymptote** to infinity. The finite zeros are $-2$ and $(-5\pm j\sqrt{75})/2=-2.5\pm j4.330$. The other poles are $-30$ and $-5\pm j8.660$ plus $+1$. The one negative-feedback asymptote has angle $180^\circ$ and centroid

$$\sigma_a=\frac{\sum p-\sum z}{4-3}=\frac{(-30-10+1)-(-2-5)}1=-32.$$

Real-axis segments follow the odd-number-to-the-right rule. Confirm the path's exact crossings numerically with the characteristic equation $D(s)+KN(s)=0$; a root-locus sketch is **a path of closed-loop poles**, not merely a connected drawing between open-loop poles and zeros.

![Root locus for the four-pole system](figures/hw08-root2.svg)

## Problem 2.3 — Root locus for a fifth-order plant with an RHP zero

The third plant is

$$G_3(s)=\frac{s-2}{(s+4)(s^2+3s+9)(s^2+20s+400)}.$$

There are five poles, one finite zero at $+2$, and four asymptotes for negative feedback at angles $45^\circ,135^\circ,225^\circ,315^\circ$. The sum of open-loop poles is $-4-3-20=-27$, so the asymptote centroid is $(\sum p-\sum z)/(5-1)=(-27-2)/4=-7.25$. The closed-loop characteristic is $D(s)+K(s-2)=0$; its constant term becomes $D(0)-2K$. At $K=D(0)/2=(4)(9)(400)/2=7200$, a closed-loop pole passes through $s=0$. Because a root-locus branch must terminate at the RHP zero $+2$, sufficiently high positive gain **cannot preserve stability**.

![Root locus for the fifth-order system](figures/hw08-root3.svg)

## Problems 3 and 4 — Textbook Problems 6.55 and 6.64

The supplied PDF specifies only problem numbers from *Feedback Control of Dynamic Systems* (7th edition), not the questions or their plant data. A unique numerical answer is **not possible**. For 6.55, the assignment mentions a lead compensator and Nyquist plot, suggesting the method: read the plant, draw root locus, set $C(s)=K(s+z)/(s+p)$, enforce the required pole-angle condition, then check stability and margins. For 6.64, even the topic is not specified by the provided page; do not invent it.
