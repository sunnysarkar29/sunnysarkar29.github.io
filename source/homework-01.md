
# Homework 1 — Foundations, nonlinear modeling, and block diagrams

**Source:** MAE511_HW1.pdf (3 pages). This guide follows all five questions. The worked mathematical answers assume standard small-signal LTI modeling and negative feedback where marked. Every equation uses consistent signal labels.

## Problem 1 — Invent a feedback control system

**Example design: actively stabilized camera gimbal on a drone.** The reference $r(t)$ is the desired camera pitch angle in radians. A motor applies torque $u(t)$ to a gimbal (the plant), an encoder measures pitch $y_m(t)$, and a proportional–derivative controller uses the error to command the motor. Aircraft vibration is the disturbance $d(t)$. One useful idealized model is

$$J\ddot\theta+b\dot\theta=u+d,\qquad e=r-\theta_m,\qquad u=K_p e-K_d\dot\theta_m.$$

The block diagram is **reference $\to$ summing junction $\to$ controller $C(s)$ $\to$ plant $G(s)$ $\to$ camera angle**, with measured angle fed negatively to the summing junction. Here $G(s)=1/(Js^2+bs)$, and a reasonable PD controller is $C(s)=K_p+K_ds$ with a filtered derivative in real hardware. This identifies the **plant, actuator, controller, sensor, and reference**, as the assignment requests.

**Why it is feedback:** a gust produces a nonzero angle error and thus a corrective motor torque even though the desired angle has not changed. Open-loop control would lack that correction.

## Problem 2 — Ball-and-beam nonlinear state-space model

The supplied coupled equations are

$$\left(m+\frac{J_b}{r^2}\right)\ddot p+mg\sin\theta-mp\dot\theta^2=0,$$
$$\left(mp^2+J+J_b\right)\ddot\theta+2mp\dot p\dot\theta+mgp\cos\theta=\tau.$$

Define $M=m+J_b/r^2$, $I(p)=mp^2+J+J_b$, $x=[p,\dot p,\theta,\dot\theta]^T$, and input $u=\tau$. Solve each second-order equation for its acceleration **before** taking derivatives:

$$\boxed{\dot x=\begin{bmatrix}x_2\\ (m x_1 x_4^2-mg\sin x_3)/M\\ x_4\\ (u-2m x_1 x_2 x_4-mg x_1\cos x_3)/I(x_1)\end{bmatrix}.}$$

At $x_e=[p_0,0,0,0]^T$, the ball has no acceleration because $\sin0=0$, and the beam equation requires $u_e=mgp_0$. **Do not set the equilibrium torque to zero:** gravity produces a moment about the hinge whenever $p_0\neq0$.

Now define perturbations $\delta x=x-x_e$ and $\delta u=u-u_e$. With $I_0=mp_0^2+J+J_b$, compute the Jacobians $A=(\partial f/\partial x)_e$ and $B=(\partial f/\partial u)_e$. In particular,

$$\frac{\partial\dot x_2}{\partial x_3}\bigg|_e=-\frac{mg}{M}\cos 0=-\frac{mg}{M},\qquad \frac{\partial\dot x_4}{\partial x_1}\bigg|_e=-\frac{mg}{I_0}.$$

For the second derivative, note that differentiating $1/I(x_1)$ also produces a term, but it multiplies the numerator $u_e-mgp_0=0$ at the equilibrium. Thus

$$\boxed{A=\begin{bmatrix}0&1&0&0\\0&0&-mg/M&0\\0&0&0&1\\-mg/I_0&0&0&0\end{bmatrix},\quad B=\begin{bmatrix}0\\0\\0\\1/I_0\end{bmatrix}.}$$

Since the measured output is the position $p=x_1$, the remaining matrices are

$$\boxed{C=\begin{bmatrix}1&0&0&0\end{bmatrix},\qquad D=0.}$$

**Physical check.** A small positive beam angle gives $\ddot p\approx-(mg/M)\theta$ under the stated sign convention. Units also work: $mg/M$ is acceleration per radian; $1/I_0$ is angular acceleration per torque.

## Problem 3 — Simplify the multi-loop block diagram

Reading the supplied drawing: $G_7$ is a parallel feedforward path from $r$ to the output. The first negative local loop encloses $G_1$ with feedback $G_2$; the second encloses $G_4$ with feedback $G_5$, and $G_3,G_6$ join these loops in series. Let $a$ denote the signal after $G_1$, and $b$ the signal after $G_4$.

$$a=G_1(r-G_2a)\quad\Rightarrow\quad a=\frac{G_1}{1+G_1G_2}r.$$
$$b=G_4(G_3a-G_5b)\quad\Rightarrow\quad b=\frac{G_3G_4}{1+G_4G_5}a.$$

The output summer adds the upper feedforward and $G_6b$:

$$y=G_7r+G_6b\quad\Rightarrow\quad\boxed{\frac Yr=G_7+\frac{G_1G_3G_4G_6}{(1+G_1G_2)(1+G_4G_5)}.}$$

This algebra assumes the lower input of the second summer is **negative feedback**, as suggested by the loop drawing. If it were marked positive, replace $1+G_4G_5$ by $1-G_4G_5$. The safest exam method is to write equations at each summer instead of memorizing arrows.

## Problem 4 — Convert a non-unity loop into an equivalent unity loop

The prefilter $P$ precedes the summing junction, the forward blocks are $C$, $A$, and $G$, and the feedback is $H$. Let $F=CAG$. Then

$$e=Pr-Hy,\qquad y=Fe=F(Pr-Hy),$$
$$\boxed{\frac Yr=\frac{PF}{1+FH}=\frac{PCAG}{1+CAGH}.}$$

A standard unity-feedback loop with equivalent single forward block $F_{\rm eq}$ has $Y/R=F_{\rm eq}/(1+F_{\rm eq})$. Solve for it:

$$\boxed{F_{\rm eq}=\frac{(Y/R)}{1-(Y/R)}=\frac{PCAG}{1+CAGH-PCAG}.}$$

This is an **input-output equivalent**, not a claim that the internal signals or robustness are unchanged. A simpler conceptual representation keeps a reference prefilter $P/H$ and a unity loop using $FH$, with an output scale $1/H$, where these inverses make sense.

## Problem 5 — Disturbance-to-output transfer function

The drawing places $K$ in series with $G$ in a unity negative-feedback loop. The disturbance $d$ enters the **output** through $G_d$ after the plant. With the reference set to zero, $e=-y$ and

$$y=GKe+G_dd=-GKy+G_dd.$$

Move the feedback term to the left and divide by $1+GK$:

$$\boxed{\frac{Y(s)}{D(s)}=\frac{G_d(s)}{1+K(s)G(s)}=G_d(s)S(s).}$$

**Exam check.** With no feedback ($K=0$), the answer reduces to $G_d$. With strong stable loop gain at the disturbance frequency, $|S|\approx1/|KG|$ and the disturbance is suppressed.
