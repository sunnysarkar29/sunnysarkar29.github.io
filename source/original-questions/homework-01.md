# Homework 01 — Source question statements

## Original question for section 1

Describe an interesting feedback control system (be creative, it doesn’t need to be real).

1. Describe the proposed control system using only a few sentences. Be sure to identify the **plant/system**, the **actuator**, the **controller**, the **signal used for feedback**, and the **reference signal**.
2. Draw a block diagram and label each signal and block.

---

## Original question for section 2

Consider the **ball-and-beam system** shown below. The dynamics of the system can be written as

$$\left(\frac{J_b}{r^2}+m\right)\ddot p(t)+mg\sin\theta(t)-mp(t)\dot\theta(t)^2=0,$$
$$\big(mp(t)^2+J+J_b\big)\ddot\theta(t)+2mp(t)\dot p(t)\dot\theta(t)+mgp(t)\cos\theta(t)=\tau(t).$$

Here $p(t)$ is ball position, $\theta(t)$ is beam angle, $\tau$ is applied torque, $g$ is gravitational acceleration, $J$ is beam inertia, and $m,r,J_b$ are the ball mass, radius and moment of inertia. Define $x_1=p$, $x_2=\dot p$, $x_3=\theta$, $x_4=\dot\theta$.

1. Place the system into nonlinear state-space form $\dot x=f(x,u)$ with torque input $u$, and $x=[x_1,x_2,x_3,x_4]^T$.
2. Find the torque required to maintain $x_{eq}=[p_0,0,0,0]^T$.
3. Linearize about $(x_{eq},u_{eq})$. Assuming the measured output is $p=x_1$, determine $A,B,C,D$ for the LTI state-space form.

![Original ball-and-beam schematic with position, angle and torque](figures/question-hw01-ball.webp)

*Original figure from the supplied assignment/exam. Included here so the question can be answered without the PDF.*


---

## Original question for section 3

Reduce/simplify the following block diagram into **one equivalent block**. Use the summing-junction signs and signal arrows shown in the original diagram.

![Original multi-loop block diagram with G1 through G7](figures/question-hw01-diag3.webp)

*Original figure from the supplied assignment/exam. Included here so the question can be answered without the PDF.*


---

## Original question for section 4

Change the following block diagram to have **unity feedback**, then simplify the resulting system into **one equivalent block**.

![Original block diagram with prefilter P, forward blocks C, A, G and feedback H](figures/question-hw01-diag4.webp)

*Original figure from the supplied assignment/exam. Included here so the question can be answered without the PDF.*


---

## Original question for section 5

Algebraically derive the transfer function from disturbance $d$ to output $y$. Label the various signals and find $Y(s)/D(s)$. The reference signal $R$ is **zero**; actual signal labels do not matter.

![Original disturbance-input feedback diagram](figures/question-hw01-diag5.webp)

*Original figure from the supplied assignment/exam. Included here so the question can be answered without the PDF.*
